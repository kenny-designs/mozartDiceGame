const Tone              = require('./lib/Tone');

class GameModel {
    constructor() {
        this.isPlaying = false;         // track if music playing
        this.allEvents = [];            // events for playing .wavs
        this.selectedNotes = [];        // measures selected to be played
        this.notePaths = [];            // paths to selected notes
        this.theScore = null;           // available measures to choose from

        // object instrument choices
        this.instruments = {'piano'       : './audio/acoustic_grand_piano/',
                            'clavinet'    : './audio/clavinet/',
                            'harpsichord' : './audio/harpsichord/'};

        this.init();
    }

    init() {
        // default instrument to play
        this.selectedPath = this.instruments['piano'];
        this.createScore();
    }

    // forms base table for theScore
    // TODO: simplify this
    createScore()
    {
        this.theScore = [
            {measures:
                [ "M96",  "M32",  "M69",  "M40", "M148", "M104", "M152", "M119",  "M98",   "M3",  "M54"]},
            {measures:
                [ "M22",   "M6",  "M95",  "M17",  "M74", "M157",  "M60",  "M84", "M142",  "M87", "M130"]},
            {measures:
                ["M141", "M128", "M158", "M113", "M163",  "M27", "M171", "M114",  "M42", "M165",  "M10"]},
            {measures:
                [ "M41",  "M63",  "M13",  "M85",  "M45", "M167",  "M53",  "M50", "M156",  "M61", "M103"]},
            {measures:
                ["M105", "M146", "M153", "M161",  "M80", "M154",  "M99", "M140",  "M75", "M135",  "M28"]},
            {measures:
                ["M122",  "M46",  "M55",   "M2",  "M97",  "M68", "M133",  "M86", "M129",  "M47",  "M37"]},
            {measures:
                [ "M11", "M134", "M110", "M159",  "M36", "M118",  "M21", "M169",  "M62", "M147", "M106"]},
            {measures:
                [ "M30",  "M81",  "M24", "M100", "M107",  "M91", "M127",  "M94", "M123",  "M33",   "M5"]},
            {measures:
                [ "M70", "M117",  "M66",  "M90",  "M25", "M138",  "M16", "M120",  "M65", "M102",  "M35"]},
            {measures:
                ["M121",  "M39", "M139", "M176", "M143",  "M71", "M155",  "M88",  "M77",   "M4",  "M20"]},
            {measures:
                [ "M26", "M126",  "M15",   "M7",  "M64", "M150",  "M57",  "M48",  "M19",  "M31", "M108"]},
            {measures:
                [  "M9",  "M56", "M132",  "M34", "M125",  "M29", "M175", "M166",  "M82", "M164",  "M92"]},
            {measures:
                ["M112", "M174",  "M73",  "M67",  "M76", "M101",  "M43",  "M51", "M137", "M144",  "M12"]},
            {measures:
                [ "M49",  "M18",  "M58", "M160", "M136", "M162", "M168", "M115",  "M38",  "M59", "M124"]},
            {measures:
                ["M109", "M116", "M145",  "M52",   "M1",  "M23",  "M89",  "M72", "M149", "M173",  "M44"]},
            {measures:
                [ "M14",  "M83",  "M79", "M170",  "M93", "M151", "M172", "M111",   "M8",  "M78", "M131"]}
        ];
    }

    // return random measure from an array
    randMeasure(noteArray) {
        let num = Math.floor(Math.random() * noteArray.length);
        return noteArray[num];
    }

    // creates a random song
    randomSong() {
        let selectedNotes = [];

        for (let i = 0; i < this.theScore.length; i++) {
            selectedNotes.push(this.randMeasure(this.theScore[i].measures));
        }

        this.selectedNotes = selectedNotes;

        this.loadPaths();
    }

    // load paths based off of the selectedNotes
    loadPaths() {
        let notePaths = [];

        for (let i = 0; i < this.selectedNotes.length; i++) {
            notePaths.push(this.selectedPath + this.selectedNotes[i] + '.wav');
        }

        this.notePaths = notePaths;
    }

    // load selectedNotes
    loadSong() {
        let minuets = new Tone.Buffers(this.notePaths, function() {
            // offset for each
            let offset = 0;

            // loop through all minuets
            for (let i = 0; i < this.notePaths.length; i++) {
                // get current buffer
                let buf = minuets.get(i);

                // create an event for it
                let evt = new Tone.Event(function(time, song) {
                    let player = new Tone.Player(song).toMaster();
                    player.start();
                }.bind(this), buf).start(offset);

                this.allEvents.push(evt);

                offset += buf.duration - 2.0; // -2.0 is fix for delay in wavs
            }
        }.bind(this));
    }

    // method clears Tone of existing song
    clearSong() {
        for (let evt in this.allEvents) {
            this.allEvents[evt].dispose();
        }
        this.allEvents = [];
    }
}

module.exports = GameModel;