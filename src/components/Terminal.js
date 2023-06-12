// implement all the custom terminal commands here
// (so everything in the docs json, note alot will pass off directly to Chess instance)

// import { Chess } from '../chess/chess';

import Gambit from '../chess/Gambit';

export const Terminal = function() {

    let game = Gambit();

    let commandHistory = [
        'Welcome to code_gambit! We teach coding through playing chess.',
        'type help(method) to see how to use a given method or check out the documentation for a list of commands.'
    ];

    function sendCommand(command) {
        commandHistory.push(command);

        let result = game.enterCommand(command);
        if (typeof result == '')
          if (result !== '') commandHistory.push(result)
        else if ( typeof result == [])
          commandHistory = []
        else 
          commandHistory.push("Segmentation fault (core dumped)")
    }

    return {
        getCommandHistory: function() {
            return commandHistory;
        },

        getPreviousCommand: function() {
            return commandHistory[commandHistory.length -1];
        },

        getPieces: function() {
            return game.getPieces();
        },

        getSelected: function() {
            return game.selected();
        },

        parseCommand: function(command) {
            sendCommand(command);
        }
    }

}