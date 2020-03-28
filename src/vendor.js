'use strict';

import $ from 'jquery';
window.$ = window.jQuery = $;
loadHyphenopoly();

function loadHyphenopoly() {
    var Hyphenopoly = {
        require: {
            es: 'Esta librería es realmente estupenda',
            it: 'Questa libreria è davvero fantastica',
            de: 'Deutschland ist ein Bundesstaat in Mitteleuropa',
            'en-us': 'FORCEHYPHENOPOLY',
        },
        paths: {
            patterndir: './js/hyphenopoly/patterns/',   //path to the directory of pattern files
            maindir: './js/hyphenopoly/',               //path to the directory where the other ressources are stored
        },
    };
    window.Hyphenopoly = Hyphenopoly;
    const hyphenopoly_loader = require('hyphenopoly/Hyphenopoly_Loader');
}
