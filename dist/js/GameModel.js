const MidiConvert       = require('./lib/MidiConvert');
const Tone              = require('./lib/Tone');

class GameModel {
    constructor() {
        this.isPlaying = false;     // track if music playing
        this.allParts = [];         // track all Tone parts
        this.selectedNotes = [];    // measures selected to be played
        this.theScore = null;       // available measures to choose from
        this.synth = null;          // instrument used to play song

        this.init();
    }

    init() {
        this.createSynth();
        this.createScore();
    }

    // forms base table for theScore
    createScore()
    {
        this.theScore = [
            {measures: ["M96.MID", "M32.MID", "M69.MID", "M40.MID",
                "M148.MID", "M104.MID", "M152.MID", "M119.MID",
                "M98.MID", "M3.MID", "M54.MID"]},
            {measures: ["M22.MID", "M6.MID", "M95.MID", "M17.MID",
                "M74.MID", "M157.MID", "M60.MID", "M84.MID",
                "M142.MID", "M87.MID", "M130.MID"]},
            {measures: ["M141.MID", "M128.MID", "M158.MID", "M113.MID",
                "M163.MID", "M27.MID", "M171.MID", "M114.MID",
                "M42.MID", "M165.MID", "M10.MID"]},
            {measures: ["M41.MID", "M63.MID", "M13.MID", "M85.MID",
                "M45.MID", "M167.MID", "M53.MID", "M50.MID",
                "M156.MID", "M61.MID", "M103.MID"]},
            {measures: ["M105.MID", "M146.MID", "M153.MID", "M161.MID",
                "M80.MID", "M154.MID", "M99.MID", "M140.MID",
                "M75.MID", "M135.MID", "M28.MID"]},
            {measures: ["M122.MID", "M46.MID", "M55.MID", "M2.MID",
                "M97.MID", "M68.MID", "M133.MID", "M86.MID",
                "M129.MID", "M47.MID", "M37.MID"]},
            {measures: ["M11.MID", "M134.MID", "M110.MID", "M159.MID",
                "M36.MID", "M118.MID", "M21.MID", "M169.MID",
                "M62.MID", "M147.MID", "M106.MID"]},
            {measures: ["M30.MID", "M81.MID", "M24.MID", "M100.MID",
                "M107.MID", "M91.MID", "M127.MID", "M94.MID",
                "M123.MID", "M33.MID", "M5.MID"]},
            {measures: ["M70.MID", "M117.MID", "M66.MID", "M90.MID",
                "M25.MID", "M138.MID", "M16.MID", "M120.MID",
                "M65.MID", "M102.MID", "M35.MID"]},
            {measures: ["M121.MID", "M39.MID", "M139.MID", "M176.MID",
                "M143.MID", "M71.MID", "M155.MID", "M88.MID",
                "M77.MID", "M4.MID", "M20.MID"]},
            {measures: ["M26.MID", "M126.MID", "M15.MID", "M7.MID",
                "M64.MID", "M150.MID", "M57.MID", "M48.MID",
                "M19.MID", "M31.MID", "M108.MID"]},
            {measures: ["M9.MID", "M56.MID", "M132.MID", "M34.MID",
                "M125.MID", "M29.MID", "M175.MID", "M166.MID",
                "M82.MID", "M164.MID", "M92.MID"]},
            {measures: ["M112.MID", "M174.MID", "M73.MID", "M67.MID",
                "M76.MID", "M101.MID", "M43.MID", "M51.MID",
                "M137.MID", "M144.MID", "M12.MID"]},
            {measures: ["M49.MID", "M18.MID", "M58.MID", "M160.MID",
                "M136.MID", "M162.MID", "M168.MID", "M115.MID",
                "M38.MID", "M59.MID", "M124.MID"]},
            {measures: ["M109.MID", "M116.MID", "M145.MID", "M52.MID",
                "M1.MID", "M23.MID", "M89.MID", "M72.MID",
                "M149.MID", "M173.MID", "M44.MID"]},
            {measures: ["M14.MID", "M83.MID", "M79.MID", "M170.MID",
                "M93.MID", "M151.MID", "M172.MID", "M111.MID",
                "M8.MID", "M78.MID", "M131.MID"]},
        ];
    }

    // create the instrument for playing the song
    createSynth() {
        this.synth = new Tone.PolySynth(8, Tone.Synth, {
            "oscillator": {
                "type": "sine3"
            },
            "envelope": {
                "attack": 0.03,
                "decay": 0.1,
                "sustain": 0.2,
                "release": 0.6
            }
        }).toMaster();
    }

    // return random measure from an array
    randMeasure(noteArray) {
        var num = Math.floor(Math.random() * noteArray.length);
        return noteArray[num];
    }

    // creates a random song
    randomSong() {
        var selectedNotes = [];

        for (var i = 0; i < this.theScore.length; i++) {
            selectedNotes.push(this.randMeasure(this.theScore[i].measures));
        }

        this.selectedNotes = selectedNotes;
    }

    // play a single note
    playNote(time, event, synth) {
        this.synth.triggerAttackRelease(event.name,
            event.duration,
            time,
            event.velocity);
    }

    // load the entirety of the selectedNotes
    loadSong() {
        var offset = 0;

        for (var i = 0; i < this.selectedNotes.length; i++) {
            // load in each midi file for playing
            MidiConvert.load("./audio/mozartMidi/" + this.selectedNotes[i]).then(function(midi) {
                Tone.Transport.bpm.value = midi.bpm; // remove?
                var theNotes = midi.tracks[0].notes;
                var aPart = new Tone.Part(function(time, note) {
                    this.playNote(time, note, this.synth);
                }.bind(this), theNotes).start(offset);

                // testing parts
                this.allParts.push(aPart);

                // take last note and add to offset
                var lastNote = theNotes.slice(-1)[0];

                // there appears to be a delay in the measures. using 1.5 as temp fix
                offset += lastNote.time - 1.5;
            }.bind(this));
        }
    }

    // method clears Tone of existing song
    clearSong() {
        for (var part in this.allParts) {
            this.allParts[part].removeAll();
        }
        this.allParts = [];
    }
}

module.exports = GameModel;