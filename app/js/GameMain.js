/*
    Existing problems include:
        1) Making sure Tone and all its dependencies are up to date and included
        2) Getting 'require' to work for MidiConvert
        3) Figuring out gulp and how to use it
        4) Get module.exports to work
        5) Connect code to play button
 */

// const MidiConvert   = require('./MidiConvert');
// const Tone          = require('./Tone');

class GameMain {
    constructor() {
        console.log('Hello World!');

        this.theScore = null;

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

        this.init();
    }

    // using init method for proper form
    init() {
        this.createScore();

        // go ahead and generate a random song
        this.genSong(this.theScore);
    }

    // forms base table for theScore
    // If I call this twice will it give problems?
    createScore()
    {
        this.theScore = [
            {measures: ["M96.mid", "M32.mid", "M69.mid", "M40.mid",
                "M148.mid", "M104.mid", "M152.mid", "M119.mid",
                "M98.mid", "M3.mid", "M54.mid"]},
            {measures: ["M22.mid", "M6.mid", "M95.mid", "M17.mid",
                "M74.mid", "M157.mid", "M60.mid", "M84.mid",
                "M142.mid", "M87.mid", "M130.mid"]},
            {measures: ["M141.mid", "M128.mid", "M158.mid", "M113.mid",
                "M163.mid", "M27.mid", "M171.mid", "M114.mid",
                "M42.mid", "M165.mid", "M10.mid"]},
            {measures: ["M41.mid", "M63.mid", "M13.mid", "M85.mid",
                "M45.mid", "M167.mid", "M53.mid", "M50.mid",
                "M156.mid", "M61.mid", "M103.mid"]},
            {measures: ["M105.mid", "M146.mid", "M153.mid", "M161.mid",
                "M80.mid", "M154.mid", "M99.mid", "M140.mid",
                "M75.mid", "M135.mid", "M28.mid"]},
            {measures: ["M122.mid", "M46.mid", "M55.mid", "M2.mid",
                "M97.mid", "M68.mid", "M133.mid", "M86.mid",
                "M129.mid", "M47.mid", "M37.mid"]},
            {measures: ["M11.mid", "M134.mid", "M110.mid", "M159.mid",
                "M36.mid", "M118.mid", "M21.mid", "M169.mid",
                "M62.mid", "M147.mid", "M106.mid"]},
            {measures: ["M30.mid", "M81.mid", "M24.mid", "M100.mid",
                "M107.mid", "M91.mid", "M127.mid", "M94.mid",
                "M123.mid", "M33.mid", "M5.mid"]},
            {measures: ["M70.mid", "M117.mid", "M66.mid", "M90.mid",
                "M25.mid", "M138.mid", "M16.mid", "M120.mid",
                "M65.mid", "M102.mid", "M35.mid"]},
            {measures: ["M121.mid", "M39.mid", "M139.mid", "M176.mid",
                "M143.mid", "M71.mid", "M155.mid", "M88.mid",
                "M77.mid", "M4.mid", "M20.mid"]},
            {measures: ["M26.mid", "M126.mid", "M15.mid", "M7.mid",
                "M64.mid", "M150.mid", "M57.mid", "M48.mid",
                "M19.mid", "M31.mid", "M108.mid"]},
            {measures: ["M9.mid", "M56.mid", "M132.mid", "M34.mid",
                "M125.mid", "M29.mid", "M175.mid", "M166.mid",
                "M82.mid", "M164.mid", "M92.mid"]},
            {measures: ["M112.mid", "M174.mid", "M73.mid", "M67.mid",
                "M76.mid", "M101.mid", "M43.mid", "M51.mid",
                "M137.mid", "M144.mid", "M12.mid"]},
            {measures: ["M49.mid", "M18.mid", "M58.mid", "M160.mid",
                "M136.mid", "M162.mid", "M168.mid", "M115.mid",
                "M38.mid", "M59.mid", "M124.mid"]},
            {measures: ["M109.mid", "M116.mid", "M145.mid", "M52.mid",
                "M1.mid", "M23.mid", "M89.mid", "M72.mid",
                "M149.mid", "M173.mid", "M44.mid"]},
            {measures: ["M14.mid", "M83.mid", "M79.mid", "M170.mid",
                "M93.mid", "M151.mid", "M172.mid", "M111.mid",
                "M8.mid", "M78.mid", "M131.mid"]},
        ];
    }

    // return random measure from an array
    randMeasure(noteArray) {
        var num = Math.floor(Math.random() * noteArray.length);
        return noteArray[num];
    }

    // play a single note
    playNote(time, event) {
        this.synth.triggerAttackRelease(event.name,
            event.duration,
            time,
            event.velocity);
        // observe midi events as music plays
        console.log(event);
    }

    // generates game song
    genSong(table, index, offset) {
        // set index and offset to defaults if not supplied
        // also, do I need the '===' or would '==' work fine?
        if (index === undefined) {index = 0;}
        if (offset === undefined) {offset = 0;}

        // set up each measure to be played
        if (index < table.length) {
            // find a random measure
            var measureName = this.randMeasure(table[index].measures);
            console.log("Column " + index + " is " + measureName);

            // load midi file for playing
            MidiConvert.load("./audio/mozartMidi/" + measureName).then(function(midi){
                Tone.Transport.bpm.value = midi.bpm; // remove?
                var theNotes = midi.tracks[0].notes;
                var aPart = new Tone.Part(this.playNote, theNotes).start(offset);

                // take last note and add to offset
                var lastNote = theNotes.slice(-1)[0];

                // there appears to be a delay in the measures. using 1.5 as temp fix
                offset += lastNote.time - 1.5;
                index++;
                this.genSong(table, index, offset);
            });
        }
    }

    beginTransport() {
        Tone.Transport.start('+0.1');
    }
}

//const gameMain = new GameMain();

module.exports = GameMain;