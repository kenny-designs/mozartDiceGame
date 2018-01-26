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

    // creates a random song
    randomSong() {
        this.gameModel.randomSong();
    }

    // load the entirety of the selectedNotes
    loadSong() {
        this.gameModel.loadSong();
    }

    // clears Tone of existing song
    clearSong() {
        this.gameModel.clearSong();
    }

    // load in newly selected measure
    loadSelection() {
        this.gameView.loadSelection(this);
    }

    // toggles image for play button
    togglePlayImage() {
        this.gameView.togglePlayImage(this.gameController.playButton, this.gameModel.isPlaying);
    }

    // updates the cover instrum image
    updateInstrumImage() {
        this.gameView.updateInstrumImage(this.gameModel.selectedInstrum, this.gameController.instrumButton);
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
        this.gameController.resetSong(this);
    }

    // TODO: simplify this code with reloadRandom()
    // reload song with correct instrument
    reloadInstrum() {
        this.updateInstrumImage();
        this.pauseSong();
        this.clearSong();
        this.loadPaths();
        this.loadSong();
        this.updatePlayfield();
        this.resetSong();
    }

    // reload a random song with the correct instrument
    reloadRandom() {
        this.pauseSong();
        this.clearSong();
        this.randomSong();
        this.loadSong();
        this.updatePlayfield();
        this.resetSong();
    }
}

module.exports = GameMain;