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
        // console.log(result);
        if (typeof result == '')
          if (result !== '') commandHistory.push(result)
        else if ( result === [])
          commandHistory = [];
        else 
          commandHistory.push("Segmentation fault (core dumped)")
    }

    return {
        getCommandHistory: function() {
            return commandHistory;
        },

        getPreviousCommand: function(amount) {
            if (amount > commandHistory.length || amount < 1)
                return commandHistory[0];
            else 
                return commandHistory[commandHistory.length - amount];
        },

        getPieces: function() {
            return game.getPieces();
        },

        getSelected: function() {
            return game.selected();
        },

        getPlayingAs: function() {
            return game.playingAs();
        },

        parseCommand: function(command) {
            return sendCommand(command);
        }
    }

}