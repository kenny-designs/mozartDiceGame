class GameView {
    constructor() {
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
                //console.log(app.gameModel.notePaths[i]);
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

        /*
        let index = 0;
        app.gameModel.theScore.forEach(function(column) {
            column.measures.forEach(function(element) {
                let measureElem = document.getElementById('note-' + index + '-' + element);

                if (app.gameModel.selectedNotes[index] === element) {
                    measureElem.classList.add('selected');
                }
                else {
                    measureElem.classList.remove('selected');
                }
            });
            index++;
        });
        */
    }

    // returns the innerHTML for a play-text element
    createPlayHTML(note) {
        return  '<div class="play-text">'   +
                    note.match(/(\d+)/)[0]  +
                '</div>';
    }

    loadSelection(app) {
        if (app.gameModel.isPlaying) {
            app.pauseSong();
        }

        app.resetSong();
        app.clearSong();
        app.loadSong();
        app.updatePlayfield();
    }
}

module.exports = GameView;