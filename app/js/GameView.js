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

    // creates the playfield for the player to interact with
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
        }

        /*
        let self = this;

        let index = 0;
        app.gameModel.theScore.forEach(function(column) {
            let columnContainer = document.createElement('div');
            columnContainer.id = 'column-' + index;
            columnContainer.classList.add('column');
            self.playContainer.appendChild(columnContainer);

            column.measures.forEach(function(element) {
                let measureElem = document.createElement('div');
                measureElem.id = 'note-' + index + '-' + element;
                measureElem.innerHTML = '<label>' + element + '</label>';
                measureElem.classList.add('note-container');

                // bound an action for when clicked
                measureElem.addEventListener('click', function(event) {
                    let elmColumn = measureElem.id.split('-')[1];
                    app.gameModel.selectedNotes[elmColumn] = element;
                    app.gameModel.notePaths[elmColumn] = app.gameModel.selectedPath + element + '.wav';
                    app.loadSelection();
                }.bind(this));

                columnContainer.appendChild(measureElem);
            });
            index++;
        });
        */
    }

    // refreshes the playField with new selections
    updatePlayfield(app) {
        for (let i = 0; i < app.gameModel.selectedNotes.length; i++) {
            let elm = document.getElementById('slot-' + i);
            elm.innerHTML = this.createPlayHTML(app.gameModel.selectedNotes[i]);
        }
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