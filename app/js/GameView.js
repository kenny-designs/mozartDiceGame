const Tone = require('Tone');

class GameView {
    constructor() {
        this.selectionContainer = document.getElementById('selection-container');
        this.instrumContainer   = document.getElementById('instrum-container');
        this.minuetContainer    = document.getElementById('minuet-container');
        this.loadingContainer   = document.getElementById('loading-container');
    }

    // creates the initial playfield for the player to interact with
    formPlayfield(app) {
        for (let i = 0; i < app.gameModel.selectedNotes.length; i++) {
            let slot = document.getElementById('slot-' + i);
            slot.innerHTML = this.createPlayHTML(app.gameModel.selectedNotes[i]);

            // event listener for clicking a single slot
            slot.addEventListener('click', function() {
                app.pauseSong();
                app.toggleLoading();

                app.updateHighlightedMin(app.gameModel.theScore[i].indexOf(app.gameModel.selectedNotes[i]));

                // gather paths we need to load in for user to sample
                let paths = [];
                for (let k = 0; k < app.gameModel.theScore[i].length; k++) {
                    paths.push(app.gameModel.selectedPath + app.gameModel.theScore[i][k] + '.wav');
                }

                // create buffers for sound files that user can sample
                app.gameModel.sampleBufs = new Tone.Buffers(paths, function() {
                    for (let j = 0; j < app.gameModel.theScore[i].length; j++) {
                        let minuet = document.getElementById('min-' + j);
                        minuet.innerHTML = this.createPlayHTML(app.gameModel.theScore[i][j]);

                        // allows the user to sample individual minuets
                        minuet.addEventListener('click', function() {
                            // if sampling, stop it and start this one instead
                            app.clearPulse();
                            app.clearSampler();

                            minuet.classList.add('pulse');
                            app.updateHighlightedMin(j);

                            app.gameModel.samplePlayer = new Tone.Player(app.gameModel.sampleBufs.get(j)).toMaster();
                            app.gameModel.samplePlayer.start(Tone.now(), 2.0); // starts with 2 second offset

                            // check for end of animation
                            minuet.addEventListener('animationend', function() {
                                app.clearPulse();
                                app.clearSampler();
                            }.bind(this));
                        }.bind(this));
                    }
                    app.toggleLoading();
                }.bind(this));

                this.selectionContainer.style.display = 'block';
                this.minuetContainer.style.display = 'block';

                // update the currently selected slot
                app.currentSlot = i;
            }.bind(this));

            app.gameModel.allSlots.push(slot);
        }
    }

    // refreshes the playField with new selections
    updatePlayfield(app) {
        for (let i = 0; i < app.gameModel.allSlots.length; i++) {
            app.gameModel.allSlots[i].innerHTML = this.createPlayHTML(app.gameModel.selectedNotes[i]);
        }
    }

    // update which slot has the playing class
    updateNowPlaying(app, slot) {
        for (let i = 0; i < app.gameModel.allSlots.length; i++) {
            app.gameModel.allSlots[i].classList.remove('playing');
        }

        if (slot)
            slot.classList.add('playing');
    }

    // returns the simplified innerHTML for a given note
    createPlayHTML(note) {
        return note.match(/(\d+)/)[0];
    }

    togglePlayImage(playButton, isPlaying) {
        playButton.style.backgroundImage =
            'url(\'' +
            (!isPlaying ? './img/buttonPlay.png' : './img/buttonPause.png') +
            '\')';
    }

    // TODO: make this better. Seems a little excess
    updateInstrumImage(instrum, button) {
        let path;
        switch (instrum) {
            case 'piano':
                path = './img/buttonPiano.png';
                break;

            case 'clavinet':
                path = './img/buttonClav.png';
                break;

            case 'harpsichord':
                path = './img/buttonHarpsi.png';
                break;
        }

        button.style.backgroundImage = 'url(\'' + path + '\')';
    }

    // updates which min is currently hightlighted based on given index
    updateHighlightedMin(app, min) {
        for (let i = 0; i < app.gameModel.theScore[0].length; i++) {
            let elm = document.getElementById('min-' + i);

            if (i != min)
                elm.classList.remove('highlight-min');
            else
                elm.classList.add('highlight-min');
        }
    }

    // clears all pulsing mins
    clearPulse(app) {
        for (let i = 0; i < app.gameModel.theScore[0].length; i++) {
            let elm = document.getElementById('min-' + i);

            elm.classList.remove('pulse');
        }
    }

    // toggles the loading screen
    toggleLoading() {
        if (this.loadingContainer.classList.contains('active'))
            this.loadingContainer.classList.remove('active');
        else
            this.loadingContainer.classList.add('active');
    }
}

module.exports = GameView;