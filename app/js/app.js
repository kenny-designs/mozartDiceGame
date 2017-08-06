// needed for require.js
// let GameMain = require('./GameMain.js');

// allows us to require and whatnot
requirejs.config({
    // By default, load any module IDs from js/lib
    baseUrl: 'js/lib',
    // if the module ID starts with 'app'
    // load it from js/app directory
    paths: {
        app: '../app'
    }
});

// main app logic
requirejs(['MidiConvert', 'Tone'],
    function() {

    });