// implement all the custom terminal commands here
// (so everything in the docs json, note alot will pass off directly to Chess instance)

// import { Chess } from '../chess/chess';

import { ChessWrapper } from '../chess/Wrapper';

export const Terminal = function() {

    // let game = Chess('');
    let game = ChessWrapper('');
    let gameStarted = false;
    let playingAs = game.WHITE;

    let selectedSquare = '';

    let commandHistory = [
        'Welcome to code_gambit! We teach coding through playing chess.',
        'type help(method) to see how to use a given method or check out the documentation for a list of commands.'
    ];

    function parseCommand(input) {
        if (!/^[a-z]+[a-zA-Z]*\([a-zA-Z0-9]*(\,[a-zA-Z0-9]*)*\)$/.test(input)){
            commandHistory.push(input);
            commandHistory.push("Invalid function format.");
            return;
        }
        // clean data
        let data = input.split('(');
        let command = data[0];
        let params = data[1].split(')')[0].split(',');
        params = params.filter((str) => { return str.length > 0; });
        // run the command
        commandHistory.push(input);
        runCommand(command, params)
    }

    function runCommand(command, params) {
        switch(command) {
            case 'select':
                if (!gameStarted)
                    commandHistory.push('A game must be started to select a piece.');
                else if (params.length !== 1)
                    commandHistory.push("select() expects 1 argument.");
                else if (game.getPiece(params[0]) === '')
                    commandHistory.push("There is no piece on this square.");
                else if (!/^[A-H][1-8]$/.test(params[0]))
                    commandHistory.push("An invalid square was given.");
                else if (!isOwnPiece(params[0]))
                    commandHistory.push("You can only select your own pieces.");
                else
                    selectedSquare = params[0].trim();
                break;
            case 'unselect':
                if (!gameStarted)
                    commandHistory.push('A game must be started to unselect a piece.');
                else if (params.length !== 0)
                    commandHistory.push("unselect() expects no arguments.");
                else
                    selectedSquare = '';
                break;
            case 'move':
                if (!gameStarted)
                    commandHistory.push('A game must be started to move a piece.');
                else if (selectedSquare === '')
                    commandHistory.push('There is no piece currently selected to move.');
                else if (params.length !== 1)
                    commandHistory.push("move() expects 1 argument.");
                else
                    commandHistory.push(game.makeMove(selectedSquare, params[0]));
                break;
            case 'take':
                if (!gameStarted)
                    commandHistory.push('A game must be started to take a piece.');
                else if (selectedSquare === '')
                    commandHistory.push('There is no piece currently selected to take with.');
                else if (params.length !== 1)
                    commandHistory.push("take() expects 1 argument.");
                else if (game.getPiece(params[0]) === '')
                    commandHistory.push('There is no piece to take on this square.');
                else
                    commandHistory.push(game.makeMove(selectedSquare, params[0]));
                break;
            case 'isValidMove':
                if (!gameStarted)
                    commandHistory.push('A game must be started to select a piece.');
                else if (selectedSquare === '')
                    commandHistory.push('There is no piece currently to check if move is valid.');
                else if (params.length !== 1 && params.length !== 2)
                    commandHistory.push("isValidMove() expects 1 or 2 arguments.");
                else if (params.length === 1)
                    commandHistory.push(game.isValidMove(selectedSquare, params[0]));
                else
                    commandHistory.push(game.isValidMove(params[0], params[1]));
                break;
            case 'showValidMoves':
                if (!gameStarted)
                    commandHistory.push('A game must be started to show valid moves.');
                else if (params.length !== 0)
                    commandHistory.push("showValidMoves() expects no arguments.");
                break;
            case 'hideValidMoves':
                if (!gameStarted)
                    commandHistory.push('A game must be started to hide valid moves.');
                else if (params.length !== 0)
                    commandHistory.push("hideValidMoves() expects no arguments.");
                break;
            case 'showMoveHistory':
                if (!gameStarted)
                    commandHistory.push('A game must be started to show move history.');
                else if (params.length !== 0)
                    commandHistory.push("showMoveHistory() expects no arguments.");
                else 
                break;
            case 'showWhiteMoves':
                if (!gameStarted)
                    commandHistory.push('A game must be started to show white\'s move history.');
                else if (params.length !== 0)
                    commandHistory.push("showWhiteMoves() expects no arguments.");
                break;
            case 'showBlackMoves':
                if (!gameStarted)
                    commandHistory.push('A game must be started to show black\'s move history.');
                else if (params.length !== 0)
                    commandHistory.push("showBlackMoves() expects no arguments.");
                break;
            case 'startGame':
                if (gameStarted)
                    commandHistory.push('You can\'t start a new game with an existing instance.');
                else if (params.length !== 0)
                    commandHistory.push("startGame() expects no arguments.");
                else
                    gameStarted = true
                break;
            case 'offerDraw':
                if (!gameStarted)
                    commandHistory.push('A game must be started to offer a draw.');
                else if (params.length !== 0)
                    commandHistory.push("offerDraw() expects no arguments.");
                break;
            case 'resign':
                if (!gameStarted)
                    commandHistory.push('A game must be started to resign.');
                else if (params.length !== 0)
                    commandHistory.push("resign() expects no arguments.");
                break;
            case 'getEvaluation':
                if (true)
                    commandHistory.push('This command is a work in progress...')
                else if (!gameStarted)
                    commandHistory.push('A game must be started to get the evaluation');
                else if (params.length !== 0)
                    commandHistory.push("getEvaluation() expects no arguments.");
                break;
            case 'getFEN':
                if (params.length !== 0)
                    commandHistory.push("getFEN() expects no argument.");
                else
                    commandHistory.push(game.generateFEN());
                break;
            case 'setFromFEN':
                if (gameStarted)
                    commandHistory.push('You can\'t change the board setup during a game');
                else if (params.length !== 1)
                    commandHistory.push("setFromFEN() expects 1 argument.");
                else if (!game.validateFEN(params[0]))
                    commandHistory.push("An invalid FEN string was given.");
                else
                    game = Chess(params[0])
                break;
            case 'setBoardTheme':
                if (params.length !== 1)
                    commandHistory.push("setBoardTheme() expects 1 argument.");
                break;
            case 'setBotDepth':
                if (gameStarted)
                    commandHistory.push('You can\'t change the bot depth during a game');
                else if (params.length !== 1)
                    commandHistory.push("setBotDepth() expects 1 argument.");
                break;
            case 'playAs':
                if (gameStarted)
                    commandHistory.push('You can\'t change who you are playing as during a game');
                else if (params.length !== 1)
                    commandHistory.push("playAs() expects 1 argument.");
                else if (params[0] !== game.WHITE && params[0] !== game.BLACK)
                    commandHistory.push("Valid paramaters are w for white or b for black.");
                else
                    playingAs = params[0];
                break;
            case 'help':
                if (params.length !== 1)
                    commandHistory.push("help() expects 1 argument.");
                break;
            case 'hint':
                if (!gameStarted)
                    commandHistory.push('A game must be started to get a hint.');
                else if (params.length !== 0 && params.length !== 1)
                    commandHistory.push("hint() expects 1 or no arguments.");
                break;
            case 'conventions':
                if (params.length !== 0)
                    commandHistory.push("select() expects no arguments.");
                break;
            default:
                commandHistory.push("This command is not recognized.");
        }
    }

    function isSelected(square) {
        return square === selectedSquare;
    }

    function isOwnPiece(square) {
        let piece = game.getPiece(square);
        if (playingAs === game.WHITE){
            return piece === piece.toUpperCase();
        }else
            return piece === piece.toLowerCase();
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