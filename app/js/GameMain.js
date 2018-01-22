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

        // commenting out for testing
        /*
        this.formPlayfield();
        this.updatePlayfield();
        */
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

    // method clears Tone of existing song
    clearSong() {
        this.gameModel.clearSong();
    }

    // load in newly selected measure
    loadSelection() {
        this.gameView.loadSelection(this);
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

    // TODO: simplify this code with reloadRandom()
    // reload song with correct instrument
    reloadInstrum() {
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