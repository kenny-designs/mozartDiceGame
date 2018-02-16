const Tone              = require('Tone');
const StartAudioContext = require('StartAudioContext');

class GameModel {
    constructor() {
        this.isPlaying          = false;    // track if music playing
        this.allEvents          = [];       // events for lighting slots
        this.allSlots           = [];       // tracks all slots
        this.selectedNotes      = [];       // measures selected to be played
        this.notePaths          = [];       // paths to selected notes
        this.theScore           = [];       // available measures to choose from
        this.selectedInstrum    = 'piano';  // currently selected instrument
        this.selectedPath       = '';       // currently selected path
        this.currentSlot        = -1;       // currently open slot
        this.sampleBufs         = null;     // bufs for sampling individual mins
        this.samplePlayer       = null;     // player used to play sample minuets

        // object instrument choices
        this.instruments = {'piano'       : './audio/acoustic_grand_piano/',
                            'clavinet'    : './audio/clavinet/',
                            'harpsichord' : './audio/harpsichord/'};

        // allows tonejs to play on mobile
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            let body = document.getElementsByTagName('body')[0];

            let mobileContainer = document.createElement('div');
            mobileContainer.id = 'mobile-container';
            body.appendChild(mobileContainer);

            let mobileButton = document.createElement('div');
            mobileButton.id = 'mobile-button';
            mobileButton.classList.add('circle');
            mobileButton.textContent = 'Enter';
            mobileContainer.appendChild(mobileButton);

            StartAudioContext(Tone.context, mobileButton, function() {
                mobileContainer.remove();
            });
        }

        this.init();
    }

    init() {
        // default instrument to play
        this.selectedPath = this.instruments[this.selectedInstrum];
        this.createScore();
    }

    // forms base table for theScore
    createScore()
    {
        this.theScore = [
                [ "M96",  "M32",  "M69",  "M40", "M148", "M104", "M152", "M119",  "M98",   "M3",  "M54"],
                [ "M22",   "M6",  "M95",  "M17",  "M74", "M157",  "M60",  "M84", "M142",  "M87", "M130"],
                ["M141", "M128", "M158", "M113", "M163",  "M27", "M171", "M114",  "M42", "M165",  "M10"],
                [ "M41",  "M63",  "M13",  "M85",  "M45", "M167",  "M53",  "M50", "M156",  "M61", "M103"],
                ["M105", "M146", "M153", "M161",  "M80", "M154",  "M99", "M140",  "M75", "M135",  "M28"],
                ["M122",  "M46",  "M55",   "M2",  "M97",  "M68", "M133",  "M86", "M129",  "M47",  "M37"],
                [ "M11", "M134", "M110", "M159",  "M36", "M118",  "M21", "M169",  "M62", "M147", "M106"],
                [ "M30",  "M81",  "M24", "M100", "M107",  "M91", "M127",  "M94", "M123",  "M33",   "M5"],
                [ "M70", "M117",  "M66",  "M90",  "M25", "M138",  "M16", "M120",  "M65", "M102",  "M35"],
                ["M121",  "M39", "M139", "M176", "M143",  "M71", "M155",  "M88",  "M77",   "M4",  "M20"],
                [ "M26", "M126",  "M15",   "M7",  "M64", "M150",  "M57",  "M48",  "M19",  "M31", "M108"],
                [  "M9",  "M56", "M132",  "M34", "M125",  "M29", "M175", "M166",  "M82", "M164",  "M92"],
                ["M112", "M174",  "M73",  "M67",  "M76", "M101",  "M43",  "M51", "M137", "M144",  "M12"],
                [ "M49",  "M18",  "M58", "M160", "M136", "M162", "M168", "M115",  "M38",  "M59", "M124"],
                ["M109", "M116", "M145",  "M52",   "M1",  "M23",  "M89",  "M72", "M149", "M173",  "M44"],
                [ "M14",  "M83",  "M79", "M170",  "M93", "M151", "M172", "M111",   "M8",  "M78", "M131"]];
    }

    // return random measure from an array
    randMeasure(noteArray) {
        let num = Math.floor(Math.random() * noteArray.length);
        return noteArray[num];
    }

    // creates a random song
    randomSong() {
        this.selectedNotes = [];

        for (let i = 0; i < this.theScore.length; i++) {
            this.selectedNotes.push(this.randMeasure(this.theScore[i]));
        }

        // TODO: Find way to remove this and place within reloadRandom in GameMain
        this.loadPaths();
    }

    // load paths based off of the selectedNotes
    loadPaths() {
        this.notePaths = [];

        for (let i = 0; i < this.selectedNotes.length; i++) {
            this.notePaths.push(this.selectedPath + this.selectedNotes[i] + '.wav');
        }
    }

    // load selectedNotes
    loadSong(app) {
        app.toggleLoading();
        let offset = 0;

        this.players = new Tone.Players(this.notePaths, function() {
            for (let i = 0; i < this.notePaths.length; i++) {
                let player = this.players.get(i);
                player.toMaster();
                player.sync().start(offset);

                let evt = new Tone.Event(function() {
                    app.updateNowPlaying(app.gameModel.allSlots[i]);
                }.bind(this)).start(offset + 2.0);

                this.allEvents.push(evt);

                offset += player.buffer.duration - 2.0;
            }
            app.toggleLoading();
        }.bind(this));
    }

    // method clears Tone of existing song
    clearSong() {
        for (let evt in this.allEvents) {
            this.allEvents[evt].dispose();
        }
        this.allEvents = [];

        this.players.dispose();

        if (this.sampleBufs)
            this.sampleBufs.dispose();
    }

    // clears the samplePlayer only
    clearSampler() {
        if (this.samplePlayer) {
            this.samplePlayer.stop();
        }
    }
}

module.exports = GameModel;