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

    // form game
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

    // highlights which slot is currently playing
    updateNowPlaying(slot) {
        this.gameView.updateNowPlaying(this, slot);
    }

    // creates a random song
    randomSong() {
        this.gameModel.randomSong();
    }

    // load the entirety of the selectedNotes
    loadSong() {
        this.gameModel.loadSong(this);
    }

    // clears Tone of existing song
    clearSong() {
        this.gameModel.clearSong();
    }

    // clears samplePlayer
    stopSampler() {
        this.gameModel.stopSampler();
    }

    // toggles image for play button
    togglePlayImage() {
        this.gameView.togglePlayImage(this.gameController.playButton, this.gameModel.isPlaying);
    }

    // updates the cover instrum image
    updateInstrumImage() {
        this.gameView.updateInstrumImage(this.gameModel.selectedInstrum, this.gameController.instrumButton);
    }

    // updates which min is currently selected based on index
    updateHighlightedMin(min) {
        this.gameView.updateHighlightedMin(this, min);
    }

    // clears all pulsing mins
    clearPulse() {
        this.gameView.clearPulse(this);
    }

    // toggles the loading screen
    toggleLoading() {
        this.gameView.toggleLoading();
    }

    // load paths, good for instrument changes
    loadPaths() {
        this.gameModel.loadPaths();
    }

    // play song via transport
    playSong() {
        this.gameController.playSong(this);
    }

    // pauses transport thus pausing song
    pauseSong() {
        this.gameController.pauseSong(this);
    }

    // restart song by setting transport to beginning
    resetSong() {
        this.gameController.resetSong();
    }

    // reload a random song
    // TODO: Simplify with the reloadSong() method
    reloadRandom() {
        this.pauseSong();
        this.clearSong();
        this.randomSong();
        this.loadSong();
        this.updatePlayfield();
        this.resetSong();
        this.updateNowPlaying();
    }

    // general reloading of song
    reloadSong() {
        this.pauseSong();
        this.clearSong();
        this.loadPaths();
        this.loadSong();
        this.updatePlayfield();
        this.resetSong();
        this.updateNowPlaying();
    }
}

module.exports = GameMain;