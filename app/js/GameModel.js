class GameModel {
    constructor() {
        this.isPlaying = false;     // track if music playing
        this.allParts = [];         // track all Tone parts
        this.selectedNotes = [];    // measures selected to be played
    }
}

module.exports = GameModel;