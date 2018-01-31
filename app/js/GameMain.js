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

    // reload a random song
    // TODO: Simplify with the reloadSong() method
    reloadRandom() {
        this.pauseSong();
        this.clearSong();
        this.randomSong();
        this.loadSong();
        this.updatePlayfield();
        this.resetSong();
    }

    // general reloading of song
    reloadSong() {
        this.pauseSong();
        this.clearSong();
        this.loadPaths();
        this.loadSong();
        this.updatePlayfield();
        this.resetSong();
    }
}

module.exports = GameMain;