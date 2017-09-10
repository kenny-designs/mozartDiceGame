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
        let self = this;

        var index = 0;
        app.gameModel.theScore.forEach(function(column) {
            var columnContainer = document.createElement('div');
            columnContainer.id = 'column-' + index;
            columnContainer.classList.add('column');
            self.playContainer.appendChild(columnContainer);

            column.measures.forEach(function(element) {
                var measureElem = document.createElement('div');
                measureElem.id = 'note-' + element;
                measureElem.innerHTML = '<label>' + element + '</label>';
                measureElem.classList.add('note-container');

                if (app.gameModel.selectedNotes[index] === element) {
                    measureElem.classList.add('selected');
                }

                columnContainer.appendChild(measureElem);
            });
            index++;
        });
    }

    // refreshes the playField with new selections
    updatePlayfield(app) {
        var index = 0;
        app.gameModel.theScore.forEach(function(column) {
            column.measures.forEach(function(element) {
                var measureElem = document.getElementById('note-' + element);

                if (app.gameModel.selectedNotes[index] === element) {
                    measureElem.classList.add('selected');
                }
                else {
                    measureElem.classList.remove('selected');
                }
            });
            index++;
        });
    }
}

module.exports = GameView;