const MidiConvert       = require('./lib/MidiConvert');
const Tone              = require('./lib/Tone');
const GameModel         = require('./GameModel');
const GameView          = require('./GameView');
const GameController    = require('./GameController');

class GameMain {
    constructor() {
        // create objects of needed classes
        this.gameModel          = new GameModel();
        this.gameView           = new GameView();
        this.gameController     = new GameController(this);

        this.playContainer = document.getElementById('play-container');
        this.selectedNotes = [];
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
        this.randomSong();
        this.loadSong();
        this.formPlayfield();
    }

    // forms base table for theScore
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

    // creates the playfield for the player to interact with
    formPlayfield() {
        let self = this;

        var index = 0;
        this.theScore.forEach(function(column) {
            var columnContainer = document.createElement('div');
            columnContainer.id = 'column-' + index;
            columnContainer.classList.add('column');
            self.playContainer.appendChild(columnContainer);

            column.measures.forEach(function(element) {
                var measureElem = document.createElement('div');
                measureElem.id = 'note-' + element;
                measureElem.innerHTML = '<label>' + element + '</label>';
                measureElem.classList.add('note-container');

                if (self.selectedNotes[index] === element) {
                    measureElem.classList.add('selected');
                }

                columnContainer.appendChild(measureElem);
            });
            index++;
        });
    }

    // refreshes the playField with new selections
    updatePlayfield() {
        let self = this;

        var index = 0;
        this.theScore.forEach(function(column) {
            column.measures.forEach(function(element) {
                var measureElem = document.getElementById('note-' + element);

                if (self.selectedNotes[index] === element) {
                    measureElem.classList.add('selected');
                }
                else {
                    measureElem.classList.remove('selected');
                }
            });
            index++;
        });
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
                this.gameModel.allParts.push(aPart);

                // take last note and add to offset
                var lastNote = theNotes.slice(-1)[0];

                // there appears to be a delay in the measures. using 1.5 as temp fix
                offset += lastNote.time - 1.5;
            }.bind(this));
        }
    }

    // method clears Tone of existing song
    clearSong() {
        console.log('clearSong() called...');
        for (var part in this.gameModel.allParts) {
            this.gameModel.allParts[part].removeAll();
        }
        this.gameModel.allParts = [];
    }

    // play song via transport
    playSong() {
        Tone.Transport.start('+0.1');
        this.gameModel.isPlaying = true;
        console.log('Now playing...');
    }

    // pauses transport thus pausing song
    pauseSong() {
        Tone.Transport.pause();
        this.gameModel.isPlaying = false;
        console.log('Pausing...');
    }

    // restart song by setting transport to beginning
    resetSong() {
        Tone.Transport.position = '0:0:0';
        console.log('Restarting song...');
    }
}

module.exports = GameMain;