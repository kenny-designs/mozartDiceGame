const Tone              = require('./lib/Tone');

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

    // play song via transport
    playSong(app) {
        Tone.Transport.start('+0.1');
        app.gameModel.isPlaying = true;
        console.log('Now playing...');
    }

    // pauses transport thus pausing song
    pauseSong(app) {
        Tone.Transport.pause();
        app.gameModel.isPlaying = false;
        console.log('Pausing...');
    }

    // restart song by setting transport to beginning
    resetSong() {
        Tone.Transport.position = '0:0:0';
        console.log('Restarting song...');
    }
}

module.exports = GameController;