class GameView {
    constructor() {
        this.selectionContainer = document.getElementById('selection-container');
        this.instrumContainer = document.getElementById('instrum-container');
        this.minuetContainer = document.getElementById('minuet-container');
        this.playContainer = document.getElementById('play-container');

        this.init();
    }

    init() {
        // code
    }

    // creates the initial playfield for the player to interact with
    formPlayfield(app) {
        for (let i = 0; i < app.gameModel.selectedNotes.length; i++) {
            let elm = document.getElementById('slot-' + i);
            elm.innerHTML = this.createPlayHTML(app.gameModel.selectedNotes[i]);

            elm.addEventListener('click', function() {
                // populate minuetContainer with appropriate minuets
                for (let j = 0; j < app.gameModel.theScore[i].length; j++) {
                    let minuet = document.getElementById('min-' + j);
                    minuet.innerHTML = this.createPlayHTML(app.gameModel.theScore[i][j]);
                }

                this.selectionContainer.style.display = 'block';
                this.minuetContainer.style.display = 'block';

                // update the currently selected slot
                app.currentSlot = i;
            }.bind(this));

            app.gameModel.allSlots.push(elm);
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
}

module.exports = GameView;