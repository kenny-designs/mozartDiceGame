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

        this.init();
    }

    // using init method for proper form
    init() {
        this.randomSong();
        this.loadSong();
        this.formPlayfield();
    }

    // creates the playfield for the player to interact with
    formPlayfield() {
        this.gameView.formPlayfield(this);
    }

    // refreshes the playField with new selections
    updatePlayfield() {
        this.gameView.updatePlayfield(this);
    }

    // return random measure from an array
    randMeasure(noteArray) {
        var num = Math.floor(Math.random() * noteArray.length);
        return noteArray[num];
    }

    // creates a random song
    randomSong() {
        var selectedNotes = [];

        for (var i = 0; i < this.gameModel.theScore.length; i++) {
            selectedNotes.push(this.randMeasure(this.gameModel.theScore[i].measures));
        }

        this.gameModel.selectedNotes = selectedNotes;
    }

    // play a single note
    playNote(time, event, synth) {
        this.gameModel.synth.triggerAttackRelease(event.name,
            event.duration,
            time,
            event.velocity);
    }

    // load the entirety of the selectedNotes
    loadSong() {
        var offset = 0;

        for (var i = 0; i < this.gameModel.selectedNotes.length; i++) {
            // load in each midi file for playing
            MidiConvert.load("./audio/mozartMidi/" + this.gameModel.selectedNotes[i]).then(function(midi) {
                Tone.Transport.bpm.value = midi.bpm; // remove?
                var theNotes = midi.tracks[0].notes;
                var aPart = new Tone.Part(function(time, note) {
                    this.playNote(time, note, this.gameModel.synth);
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