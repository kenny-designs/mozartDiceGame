class GameController {
    constructor(app) {
        // setup play/pause button
        this.playButton = document.getElementById('play-button');
        this.playButton.addEventListener('click', function(event) {
            // toggle song playing
            app.gameModel.isPlaying ? app.pauseSong() : app.playSong();
        }.bind(this));

        // setup random button
        this.randomButton = document.getElementById('random-button');
        this.randomButton.addEventListener('click', function(event) {
            app.pauseSong();
            app.clearSong();
            app.randomSong();
            app.loadSong();
            app.updatePlayfield();
            app.resetSong();
        }.bind(this));
    }
}

module.exports = GameController;