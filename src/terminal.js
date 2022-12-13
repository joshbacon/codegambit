// implement all the custom terminal commands here
// (so everything in the docs json, note alot will pass off directly to Chess instance)

import { Chess } from './chess/chess';

export const Terminal = function() {

    let game = Chess('');
    let gameStarted = false;

    let selectedSquare = '';

    let commandHistory = [
        'Welcome to code_gambit! We teach coding through playing chess.',
        'type help(method) to see how to use a given method or check out the documentation for a list of commands.',
        'CURRENTLY WORKING ON: the getPiece/placePiece/removePiece commands in chess.js do NOT work'
    ];

    function parseCommand(input) {
        console.log(input);
        if (!/^[a-z]+[a-zA-Z]*\([a-zA-Z0-9]*(\,[a-zA-Z0-9]*)*\)$/.test(input)){
            commandHistory.push(input);
            commandHistory.push("Invalid function format.");
            return;
        }
        // clean data
        let data = input.split('(');
        let command = data[0];
        let params = '';
        if (data.length > 1){
            params = data[1].split(')')[0].split(',');
        }
        // run the command
        commandHistory.push(input);
        runCommand(command, params)
    }

    // MAKE SURE TO CHECK IF GAME HAS STARTED OR NOT FOR EACH COMMAND
    function runCommand(command, params) {
        switch(command) {
            case 'select':
                if (!gameStarted)
                    commandHistory.push('A game must be started to select a piece.');
                else if (game.getPiece(params[0]) === '')
                    commandHistory.push("There is no piece on this square.");
                else if (!/^[A-H][1-8]$/.test(params[0]))
                    commandHistory.push("An invalid square was given.");
                else
                    selectedSquare = params[0].trim();
                break;
            case 'unselect':
                if (!gameStarted)
                    commandHistory.push('A game must be started to unselect a piece.');
                else
                    selectedSquare = '';
                break;
            case 'move':
                if (!gameStarted)
                    commandHistory.push('A game must be started to move a piece.');
                else if (selectedSquare === '')
                    commandHistory.push('There is no piece currently selected to move.');
                else
                    game.makeMove();
                break;
            case 'take':
                if (!gameStarted)
                    commandHistory.push('A game must be started to take a piece.');
                else if (selectedSquare === '')
                    commandHistory.push('There is no piece currently selected to take with.');
                break;
            case 'isValidMove':
                if (!gameStarted)
                    commandHistory.push('A game must be started to select a piece.');
                else if (selectedSquare === '')
                    commandHistory.push('There is no piece currently to check if move is valid.');
                break;
            case 'showValidMoves':
                if (!gameStarted)
                    commandHistory.push('A game must be started to show valid moves.');
                break;
            case 'hideValidMoves':
                if (!gameStarted)
                    commandHistory.push('A game must be started to hide valid moves.');
                break;
            case 'showMoveHistory':
                if (!gameStarted)
                    commandHistory.push('A game must be started to show move history.');
                break;
            case 'showWhiteMoves':
                if (!gameStarted)
                    commandHistory.push('A game must be started to show white\'s move history.');
                break;
            case 'showBlackMoves':
                if (!gameStarted)
                    commandHistory.push('A game must be started to show black\'s move history.');
                break;
            case 'startGame':
                if (gameStarted)
                    commandHistory.push('You can\'t start a new game with an existing instance.');
                break;
            case 'offerDraw':
                if (!gameStarted)
                    commandHistory.push('A game must be started to offer a draw.');
                break;
            case 'resign':
                if (!gameStarted)
                    commandHistory.push('A game must be started to resign.');
                break;
            case 'getEvaluation':
                if (true)
                    commandHistory.push('This command is a work in progress...')
                if (!gameStarted)
                    commandHistory.push('A game must be started to get the evaluation');
                break;
            case 'getFEN':
                commandHistory.push(game.generateFEN());
                break;
            case 'setFromFEN':
                if (gameStarted)
                    commandHistory.push('You can\'t change the board setup during a game');
                else
                    game = Chess(params[0])
                break;
            case 'setBoardTheme':
                break;
            case 'setBotDepth':
                if (gameStarted)
                    commandHistory.push('You can\'t change the bot depth during a game');
                break;
            case 'playAs':
                if (gameStarted)
                    commandHistory.push('You can\'t change who you are playing as during a game');
                break;
            case 'help':
                break;
            case 'hint':
                if (!gameStarted)
                    commandHistory.push('A game must be started to get a hint.');
                break;
            case 'conventions':
                break;
            default:
                commandHistory.push("This command is not recognized.");
        }
    }

    function isSelected(square) {
        return square === selectedSquare;
    }

    return {

        getCommandHistory: function() {
            return commandHistory;
        },

        getPieces: function() {
            return game.getPieces();
        },

        isSelected: function(square) {
            return isSelected(square);
        },

        parseCommand: function(command) {
            parseCommand(command);
        }

    }

}