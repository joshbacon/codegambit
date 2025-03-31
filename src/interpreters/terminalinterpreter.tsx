import { useState } from 'react';
import DocData from '../data/docs.json';
import DocLookup from '../data/docLookup.json';
import { move, status, moves, aiMove, getFen } from 'js-chess-engine';
import Command from '../models/command';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setBoardTheme, setSelected } from '../reducers/visual';
import { setFEN, setStarted, setAIDepth, setPlayingAs } from '../reducers/game';
import { setValidMoves } from '../reducers/visual';
import Move from '../models/move';

const TerminalInterpreter = (editorEnabled: boolean, historyPretext: string) => {

    
    const { fen, started, aiDepth, playingAs, singlePlayer, moveHistory } = useAppSelector(state => state.game);
    const { selected, validMoves } = useAppSelector(state => state.visual);
    
    const dispatch = useAppDispatch();
    
    const defaultFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

    const WHITE = 'w';
    const BLACK = 'b';

    const [history, setHistory] = useState<string[]>([historyPretext]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    let toAppend: string[] = [];

    function parseCommand(input: string) {

        // Update history
        toAppend.push(input);
        setCommandHistory([...commandHistory, input]);

        // Check input
        if (!/^[a-z]+[a-zA-Z]*\(-?[a-zA-Z0-9]*(\,\s?\-?[a-zA-Z0-9]*)*\)$/.test(input)) {
            toAppend.push('Invalid function format.');
            appendToHistory();
            return;
        }

        // Clean input
        const data: string[] = input.split('(');
        const command: string = data[0];
        let parameters: string[] = data[1] === ')' ? [] : data[1].replace(')', '').split(',');
        parameters = parameters.map(p => p.trim());

        runCommand(command, parameters);
    }

    function appendToHistory() {
        setHistory([...history, ...toAppend]);
        toAppend = [];
    }

    function runCommand(command: string, parameters: string[]) {
        switch (command) {
            case 'select':
                if (!started) {
                    toAppend.push('A game must be started to select a piece.');
                } else if (parameters.length !== 1) {
                    toAppend.push('The select function expects 1 argument.');
                } else if (isNotPiece(parameters[0])) {
                    toAppend.push('There is no piece on this square.');
                } else if (!/^[A-H][1-8]$/.test(parameters[0])) {
                    toAppend.push('An invalid square was given.');
                } else if (!isOwnPiece(parameters[0])) {
                    toAppend.push('You can only select your own pieces.');
                } else {
                    dispatch(setSelected(parameters[0]));
                    toAppend.push(parameters[0]);
                }
                appendToHistory();
                break;
            case 'unselect':
                if (!started) {
                    toAppend.push('A game must be started to unselect a piece.');
                } else if (parameters.length !== 0) {
                    toAppend.push('The unselect funciton expects no arguments.');
                } else if (selected === '') {
                    toAppend.push('A square must be selected to unselect.');
                } else {
                    dispatch(setSelected(''));
                    toAppend.push(parameters[0]);
                }
                appendToHistory();
                break;
            case 'isValidMove':
                if (!started) {
                    toAppend.push('A game must be started to select a piece.');
                } else if (parameters.length !== 1 && parameters.length !== 2) {
                    toAppend.push("The isValidMove function expects 1 or 2 arguments.");
                } else if (selected === '' && parameters.length === 1) {
                    toAppend.push('A piece must be selected or passed as a parameter to check move validity.');
                } else {
                    if (!/^[A-H][1-8]$/.test(parameters[0])) {
                        toAppend.push('An invalid square was given.');
                    } else if (parameters.length === 1) {
                        toAppend.push(`${isValidMove(selected, parameters[0])}`);
                    } else {
                        if (!/^[A-H][1-8]$/.test(parameters[1])) {
                            toAppend.push('An invalid square was given.');
                        } else if (isNotPiece(parameters[0])) {
                            toAppend.push('There is no piece on the given square.');
                        } else if (!isOwnPiece(parameters[0])) {
                            toAppend.push('The first square given must contain one of your own pieces.');
                        } else {
                            toAppend.push(`${isValidMove(parameters[0], parameters[1])}`);
                        }
                    }
                }
                appendToHistory();
                break;
            case 'getValidMoves':
                if (!started) {
                    toAppend.push('A game must be started to get valid moves.');
                } else if (parameters.length !== 0 && parameters.length !== 1) {
                    toAppend.push('The getValidMoves function expects 0 or 1 arguments.');
                } else if (selected === '' && parameters.length !== 1) {
                    toAppend.push('A piece must be selected or passed as a parameter to get valid moves.');
                } else if (parameters.length === 1) {
                    if (!/^[A-H][1-8]$/.test(parameters[0])) {
                        toAppend.push('An invalid square was given.');
                    } else if (isNotPiece(parameters[0])) {
                        toAppend.push('There is no piece on the given square.');
                    } else {
                        toAppend.push('[' + getValidMoves(parameters[0]).toString() + ']');
                    }
                } else {
                    toAppend.push('[' + getValidMoves().toString() + ']');
                }
                appendToHistory();
                break;
            case 'showValidMoves':
                if (!started) {
                    toAppend.push('A game must be started to show valid moves.');
                } else if (parameters.length !== 0 && parameters.length !== 1) {
                    toAppend.push('The getValidMoves function expects 0 or 1 arguments.');
                } else if (selected === '' && parameters.length !== 1) {
                    toAppend.push('A piece must be selected or passed as a parameter to get valid moves.');
                } else if (parameters.length === 1) {
                    if (!/^[A-H][1-8]$/.test(parameters[0])) {
                        toAppend.push('An invalid square was given.');
                    } else if (isNotPiece(parameters[0])) {
                        toAppend.push('There is no piece on the given square.');
                    } else {
                        const possibleMoves = getValidMoves(parameters[0]);
                        dispatch(setValidMoves(possibleMoves));
                        toAppend.push('[' + possibleMoves.toString() + ']');
                    }
                } else {
                    const possibleMoves = getValidMoves();
                    dispatch(setValidMoves(possibleMoves));
                    toAppend.push('[' + possibleMoves.toString() + ']');
                }
                appendToHistory();
                break;
            case 'hideValidMoves':
                if (!started) {
                    toAppend.push('A game must be started to hide valid moves.');
                } else if (parameters.length !== 0) {
                    toAppend.push('The hideValidMoves funciton expects 0 parameters.');
                } else if (validMoves.length === 0) {
                    toAppend.push('No valid moves are currently showing.');
                } else {
                    dispatch(setValidMoves([]));
                }
                appendToHistory();
                break;
            case 'showMoveHistory':
                if (!started) {
                    toAppend.push('A game must be started to show move history.');
                } else if (parameters.length !== 0) {
                    toAppend.push('The showMoveHistory function expects 0 parameters.');
                } else {
                    toAppend.push(formatMoves(''));
                }
                appendToHistory();
                break;
            case 'showWhiteMoves':
                if (!started) {
                    toAppend.push('A game must be started to show white\'s move history.');
                } else if (parameters.length !== 0) {
                    toAppend.push('The showWhiteMoves function expects 0 parameters.');
                } else {
                    toAppend.push(formatMoves(WHITE));
                }
                appendToHistory();
                break;
            case 'showBlackMoves':
                if (!started) {
                    toAppend.push('A game must be started to show black\'s move history.');
                } else if (parameters.length !== 0) {
                    toAppend.push('The showBlackMoves function expects 0 parameters.');
                } else {
                    toAppend.push(formatMoves(BLACK));
                }
                appendToHistory();
                break;
            case 'startGame':
                if (started) {
                    toAppend.push('A match is already in session.');
                } else if (parameters.length > 0) {
                    toAppend.push('The gameStart function expects 0 parameters.');
                } else {
                    dispatch(setStarted(true));
                    if (singlePlayer && playingAs === BLACK) {
                        //playAiMove();
                    }
                }
                appendToHistory();
                break;
            case 'offerDraw':
                if (!started) {
                    toAppend.push('A game must be started to offer a draw.');
                } else if (parameters.length !== 0) {
                    toAppend.push('The offerDraw function expects 0 parameters.');
                } else if (aiDepth * Math.ceil(Math.random()) % 10 >= 3) {
                    toAppend.push('Draw was declined.');
                } else {
                    dispatch(setStarted(false));
                    toAppend.push('Draw was accepted.');
                }
                appendToHistory();
                break;
            case 'resign':
                if (!started) {
                    toAppend.push('A game must be started to resign.');
                } else if (parameters.length !== 0) {
                    toAppend.push('The resign function expects 0 parameters.');
                } else {
                    dispatch(setStarted(false));
                    toAppend.push(`${playingAs === WHITE ? 'Black' : 'White'} wins!`);
                }
                appendToHistory();
                break;
            case 'resetBoard':
                if (started) {
                    toAppend.push('Cannot reset the board while in a game.');
                } else if (parameters.length !== 0) {
                    toAppend.push('The resign function expects 0 parameters.');
                } else {
                    dispatch(setFEN(defaultFEN));
                    toAppend.push(defaultFEN);
                }
                appendToHistory();
                break;
            case 'getFEN':
                if (parameters.length !== 0) {
                    toAppend.push('The getFEN function expects 0 parameters.');
                } else {
                    toAppend.push(fen);
                }
                appendToHistory();
                break;
            case 'setBoardTheme':
                if (parameters.length !== 1) {
                    toAppend.push('The setBoardTheme function expects 1 parameter.');
                } else if (!['dark', 'light', 'purple', 'blue', 'green', 'orange'].includes(parameters[0])) {
                    toAppend.push('Not a valid theme name.');
                } else {
                    dispatch(setBoardTheme(parameters[0]));
                    toAppend.push(parameters[0]);
                }
                appendToHistory();
                break;
            case 'setBotDepth':
                if (parameters.length !== 1) {
                    toAppend.push('The setBotDepth function expects 1 parameter.');
                } else if (isNaN(+parameters[0])) {
                    toAppend.push('The setBotDepth function expects a number as a parameter.');
                } else if (Number(parameters[0]) < 0 || Number(parameters[0]) > 3) {
                    toAppend.push('New depth must be in the range [0, 3].');
                } else {
                    dispatch(setAIDepth(Number(parameters[0])));
                    toAppend.push(parameters[0]);
                }
                appendToHistory();
                break;
            case 'playAs':
                if (started) {
                    toAppend.push('You can\'t change who you are playing as during a game.');
                } else if (parameters.length !== 1) {
                    toAppend.push('The playAs function expects 1 parameter.');
                } else if (parameters[0] !== WHITE && parameters[0] !== BLACK) {
                    toAppend.push('Valid paramaters are w for white or b for black.');
                } else {
                    dispatch(setPlayingAs(parameters[0]));
                    toAppend.push(parameters[0]);
                }
                appendToHistory();
                break;
            case 'help':
                if (parameters.length !== 1) {
                    toAppend.push('The help function expects 1 parameter.');
                } else if (!DocLookup.map(e => e.key).includes(parameters[0])) {
                    toAppend.push(command + ' is not a valid function name.');
                } else {
                    const result: string[] = formatHelp(parameters[0]);
                    toAppend.push(...result);
                }
                appendToHistory();
                break;
            case 'clear':
                if (parameters.length > 0) {
                    toAppend.push('The clear function expects 0 parameters.');
                } else {
                    setHistory([]);
                    toAppend = [];
                }
                break;
            default:
                toAppend.push('Command not recognized.');
                appendToHistory();
        }
    }

    // Helper Functions

    function isNotPiece(square: string) {
        return getPiece(square) === '' || getPiece(square) === undefined;
    }

    function getPiece(square: string) {
        return getPieces()[square];
    }

    function getPieces() {
        return status(fen).pieces;
    }

    function isOwnPiece(square: string) {
        if (playingAs === WHITE) {
            return square === square.toUpperCase();
        } else {
            return square === square.toLowerCase();
        }
    }

    function isValidMove(from: string, to: string) {
      let validMoves = moves(fen)[from];
      return validMoves && validMoves.includes(to);
    }
  
    
    function getValidMoves(square: string = selected) {
        const possibleMoves = moves(fen)[square];
        if (possibleMoves) {
            return moves(fen)[square];
        } else {
            return '';
        }
    }
    
    function formatMoves(side: string) {
        let result = [];
        if (side === WHITE) {
            let whiteMoves = moveHistory.filter((_, index) => index % 2 === 0);
            result = whiteMoves.map((move: Move) => '[' + move.from + ',' + move.to + ']');
        } else if (side === BLACK) {
            let blackMoves = moveHistory.filter((_, index) => index % 2 === 1);
            result = blackMoves.map((move: Move) => '[' + move.from + ',' + move.to + ']');
        } else {
            result = moveHistory.map((move: Move) => '[' + move.from + ',' + move.to + ']');
        }
        return '['+result.join(' ')+']';
    }

    function formatHelp(command: string) {
        const index = DocLookup.map(e => e.key).indexOf(command);
        const data: Command = DocData[DocLookup[index].id].commands[DocLookup[index].cid];
        return [
            data.name,
            `parameters: ${data.params}`,
            `example: ${data.example}`,
            data.description
        ]
    }

    return {
        history: () => { return history; },
        commandHistory: () => { return commandHistory; },
        sendCommand: (command: string) => { parseCommand(command) },
    }
    
}

export default TerminalInterpreter;