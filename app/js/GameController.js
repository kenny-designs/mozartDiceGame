const Tone              = require('./lib/Tone');
const Soundfont         = require('soundfont-player');

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

        // create a new AudioContext to work with
        this.ac = new AudioContext();
        // using export button as a test for soundfont-player
        this.exportButton = document.getElementById('export-button');
        this.exportButton.addEventListener('click', function(event) {
            Soundfont.instrument(this.ac, 'viola').then(function(piano) {
                piano.play('C4');
            });
        }.bind(this));
    }

    // play song via transport
    playSong(app) {
        Tone.Transport.start('+0.1');
        app.gameModel.isPlaying = true;
    }

    // pauses transport thus pausing song
    pauseSong(app) {
        Tone.Transport.pause();
        app.gameModel.isPlaying = false;
    }

    // restart song by setting transport to beginning
    resetSong() {
        Tone.Transport.position = '0:0:0';
    }
}

module.exports = GameController;