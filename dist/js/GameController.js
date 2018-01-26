const Tone              = require('Tone');

class GameController {
    constructor(app) {
        // setup play/pause button
        this.playButton = document.getElementById('play-button');
        this.playButton.addEventListener('click', function() {
            // toggle song playing
            app.gameModel.isPlaying ? app.pauseSong() : app.playSong();
        }.bind(this));

        // setup random button
        this.randomButton = document.getElementById('random-button');
        this.randomButton.addEventListener('click', function() {
            app.reloadRandom();
        }.bind(this));

        // setup instrument select button
        this.instrumButton = document.getElementById('instrum-button');
        this.instrumButton.addEventListener('click', function() {
            app.gameView.selectionContainer.style.display = 'block';
            app.gameView.instrumContainer.style.display = 'block'
        }.bind(this));

        // setup reset button
        this.resetButton = document.getElementById('reset-button');
        this.resetButton.addEventListener('click', function() {
            app.resetSong();
        }.bind(this));

        // setup exit button to hide the selection-container
        this.exitButton = document.getElementById('exit-button');
        this.exitButton.addEventListener('click', function() {
            app.gameView.selectionContainer.style.display = 'none';
            app.gameView.instrumContainer.style.display = 'none';
            app.gameView.minuetContainer.style.display = 'none';
        }.bind(this));

        /*
        // export button currently does nothing
        this.exportButton = document.getElementById('export-button');
        this.exportButton.addEventListener('click', function(event) {
            console.log('export button pressed');
        }.bind(this));
        */

        // switch to piano sound files
        this.pianoButton = document.getElementById('piano-button');
        this.pianoButton.addEventListener('click', function() {
            app.gameModel.selectedInstrum = 'piano';
            app.gameModel.selectedPath = app.gameModel.instruments['piano'];
            app.reloadInstrum();
        }.bind(this));

        // switch to clavinet sound files
        this.clavButton = document.getElementById('clav-button');
        this.clavButton.addEventListener('click', function() {
            app.gameModel.selectedInstrum = 'clavinet';
            app.gameModel.selectedPath = app.gameModel.instruments['clavinet'];
            app.reloadInstrum();
        }.bind(this));

        // switch to harpsichord sound files
        this.harpsiButton = document.getElementById('harpsi-button');
        this.harpsiButton.addEventListener('click', function() {
            app.gameModel.selectedInstrum = 'harpsichord';
            app.gameModel.selectedPath = app.gameModel.instruments['harpsichord'];
            app.reloadInstrum();
        }.bind(this));
    }

    // play song via transport
    playSong(app) {
        Tone.Transport.start('+0.1');
        app.gameModel.isPlaying = true;
        app.togglePlayImage();
    }

    // pauses transport thus pausing song
    pauseSong(app) {
        Tone.Transport.pause();
        app.gameModel.isPlaying = false;
        app.togglePlayImage();
    }

    // restart song by setting transport to beginning
    resetSong(app) {
        app.pauseSong();
        Tone.Transport.position = '0:0:0';
    }
}

module.exports = GameController;