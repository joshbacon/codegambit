import { useEffect, useState } from 'react';

import DocData from '../data/docs.json';
import DocLookup from '../data/docLookup.json';
import Command from '../models/command';
import Move from '../models/move';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setFEN, setStarted, setAIDepth, setPlayingAs, setMoveHistory } from '../reducers/game';
import { setBoardTheme, setSelected, setPreviousMoveFrom, setPreviousMoveTo, setValidMoves, setMateSquare, clearShowing } from '../reducers/visual';

import { move, status, moves, aiMove } from 'js-chess-engine';

import ScriptInterpreter from './scriptinterpreter';

const TerminalInterpreter = (editorEnabled: boolean, historyPretext: string) => {

    const { fen, started, aiDepth, playingAs, singlePlayer, moveHistory } = useAppSelector(state => state.game);
    const { selected, validMoves } = useAppSelector(state => state.visual);
    
    const dispatch = useAppDispatch();
    
    const defaultFEN: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const [enteredFEN, setEnteredFEN] = useState<string>(defaultFEN);
    
    const WHITE: string = 'w';
    const BLACK: string = 'b';
    
    const [history, setHistory] = useState<string[]>([historyPretext]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    let toAppend: string[] = [];

    // Script variables

    const [scriptInterpreter, setScriptInterpreter] = useState<ScriptInterpreter>(new ScriptInterpreter(editorEnabled));

    const [runningScript, setRunningScript] = useState<boolean>(false);

    useEffect(() => {
        promptScript();
    }, [runningScript, fen, started, selected]);


    function scriptBarrier(input: string, script?: string) {
        if (!runningScript) {
            parseCommand(input, script);
        }
    }

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async function promptScript() {
        if (status(fen).turn[0] !== playingAs) return;

        if (runningScript) {
            if (!scriptInterpreter.hasNextCommand()) {
                setRunningScript(false);
                scriptInterpreter.resetScript();
                toAppend.push('End of script.');
                appendToHistory();
            } else {
                await delay(1000);
                const nextCommand: string = scriptInterpreter.nextCommand();
                if (!/^[a-z]+[a-zA-Z]*\(-?[a-zA-Z0-9]*(\,\s?\-?[a-zA-Z0-9]*)*\)$/.test(nextCommand)) {
                    toAppend.push(nextCommand); // an error message in this case
                    appendToHistory();
                } else if (nextCommand == 'exitScript()') {
                    toAppend.push(nextCommand);
                    setRunningScript(false);
                    toAppend.push('Script terminated.');
                    appendToHistory();
                } else {
                    parseCommand(nextCommand);
                }
            }
    
        }
    }

    function parseCommand(input: string, script?: string) {

        // Update history
        toAppend.push(input);
        if (!runningScript) {
            setCommandHistory([...commandHistory, input]);
        }

        // Check input
        if ( !['setFromFEN','runScript','testScript','saveScript','loadScript','removeScript'].includes(input.split('(')[0]) &&
             !/^[a-z]+[a-zA-Z]*\(-?[a-zA-Z0-9]*(\,\s?\-?[a-zA-Z0-9]*)*\)$/.test(input) ) {
            toAppend.push('Invalid function format.');
            appendToHistory();
            return;
        }

        // Clean input
        const data: string[] = input.split('(');
        const command: string = data[0];
        let parameters: string[] = data[1] === ')' ? [] : data[1].replace(')', '').split(',');
        parameters = parameters.map(p => p.trim());

        runCommand(command, parameters, script);
    }

    function appendToHistory() {
        setHistory([...history, ...toAppend]);
        toAppend = [];
    }

    function runCommand(command: string, parameters: string[], script?: string) {
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
                    toAppend.push('The unselect funciton expects no parameters.');
                } else if (!selected) {
                    toAppend.push('A square must be selected to unselect.');
                } else {
                    dispatch(setSelected(''));
                    toAppend.push(parameters[0]);
                }
                appendToHistory();
                break;
            case 'move':
                if (!started) {
                    toAppend.push('A game must be started to move a piece.');
                } else if (parameters.length !== 1 && parameters.length !== 2) {
                    toAppend.push('The move function expects 1 or 2 parameters.');
                } else if (parameters.length == 2) {
                    if (!/^[A-H][1-8]$/.test(parameters[0]) || !/^[A-H][1-8]$/.test(parameters[1])) {
                        toAppend.push('An invalid square was given.');
                    } else if (!isValidMove(parameters[0], parameters[1])) {
                        toAppend.push('An invalid move was given.');
                    } else {
                        toAppend.push(playMove(parameters[1], parameters[0]));
                    }
                } else {
                    if (!selected) {
                        toAppend.push('A piece must be selected to make a move.');
                    } else if (!/^[A-H][1-8]$/.test(parameters[0])) {
                        toAppend.push('An invalid square was given.');
                    } else if (!isValidMove(selected, parameters[0])) {
                        toAppend.push('An invalid move was given.');
                    } else {
                        toAppend.push(playMove(parameters[0]));
                    }
                }
                appendToHistory();
                break;
            case 'take':
                if (!started) {
                    toAppend.push('A game must be started to take a piece.');
                } else if (parameters.length !== 1 && parameters.length !== 2) {
                    toAppend.push('The take function expects 1 or 2 parameters.');
                } else if (parameters.length == 2) {
                    if (!/^[A-H][1-8]$/.test(parameters[0]) || !/^[A-H][1-8]$/.test(parameters[1])) {
                        toAppend.push('An invalid square was given.');
                    } else if (!isValidMove(parameters[0], parameters[1])) {
                        toAppend.push('An invalid move was given.');
                    } else if (isNotPiece(parameters[1])) {
                        toAppend.push('There is no piece to take at the given square');
                    } else {
                        toAppend.push(playMove(parameters[1], parameters[0]));
                    }
                } else {
                    if (!selected) {
                        toAppend.push('A piece must be selected to make a move.');
                    } else if (!/^[A-H][1-8]$/.test(parameters[0])) {
                        toAppend.push('An invalid square was given.');
                    } else if (!isValidMove(selected, parameters[0])) {
                        toAppend.push('An invalid move was given.');
                    } else if (isNotPiece(parameters[0])) {
                        toAppend.push('There is no piece to take at the given square');
                    } else {
                        toAppend.push(playMove(parameters[0]));
                    }
                }
                appendToHistory();
                break;
            case 'isValidMove':
                if (!started) {
                    toAppend.push('A game must be started to select a piece.');
                } else if (parameters.length !== 1 && parameters.length !== 2) {
                    toAppend.push("The isValidMove function expects 1 or 2 parameters.");
                } else if (!selected && parameters.length === 1) {
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
                    toAppend.push('The getValidMoves function expects 0 or 1 parameters.');
                } else if (!selected && parameters.length !== 1) {
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
                    toAppend.push('The getValidMoves function expects 0 or 1 parameters.');
                } else if (!selected && parameters.length !== 1) {
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
                } else if (status(fen).isFinished) {
                    toAppend.push(finishGame());
                } else {
                    dispatch(setStarted(true));
                    if (singlePlayer && playingAs === BLACK) {
                        toAppend.push(playAiMove());
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
                    dispatch(clearShowing());
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
            case 'setFromFEN':
                if (started) {
                    toAppend.push('You can\'t set the position while in game.');
                } else if (parameters.length !== 1) {
                    toAppend.push('The setFromFEN function expects 1 parameter.');
                } else if (/^([1-8PNBRQK]+\/){7}[1-8PNBRQK]+$/gim.test(parameters[0])) {
                    // TODO: need a better regex
                    toAppend.push('Invalid FEN formatted string.');
                } else {
                    dispatch(setFEN(parameters[0]));
                    setEnteredFEN(parameters[0]);
                    toAppend.push(parameters[0]);
                }
                appendToHistory();
                break;
            case 'runScript':
                if (parameters.length !== 1) {
                    toAppend.push('The runScript function expects 1 parameter.');
                } else if (!/^[a-zA-Z0-9]*$/.test(parameters[0])) {
                    toAppend.push('Invalid script name given.');
                } else {
                    scriptInterpreter.loadScript(parameters[0]);
                    setRunningScript(true);
                }
                appendToHistory();
                break;
            case 'testScript':
                if (!editorEnabled) {
                    toAppend.push('The testScript function is only available on the script editor page.');
                } else if (typeof script === 'undefined') {
                    toAppend.push('No script to test.');
                } else if (parameters.length !== 0) {
                    toAppend.push('The testScript function expects 0 parameters.');
                } else {
                    if (!started) {
                        dispatch(setFEN(defaultFEN));
                        dispatch(setStarted(true));
                    }
                    if (scriptInterpreter.testScript(script ?? '')) {
                        toAppend.push('Testing script...');
                        setRunningScript(true);
                    }
                }
                appendToHistory();
                break;
            case 'resetTest':
                if (!editorEnabled) {
                    toAppend.push('The resetTest function is only available on the script editor page.');
                } else {
                    dispatch(setFEN(enteredFEN));
                    dispatch(setStarted(false));
                    dispatch(clearShowing());
                }
                appendToHistory();
                break;
            case 'saveScript':
                if (!editorEnabled) {
                    toAppend.push('The saveScript function is only available on the script editor page.');
                } else if (parameters.length !== 1) {
                    toAppend.push('The saveScript function expects 1 parameter.');
                } else if (typeof script === 'undefined') {
                    toAppend.push('No script to save.');
                } else if (!/^[a-zA-Z0-9]*$/.test(parameters[0]) || parameters[0] == 'example') {
                    toAppend.push('Invalid script name given.');
                } else {
                    toAppend.push(scriptInterpreter.saveScript(parameters[0], script));
                }
                appendToHistory();
                break;
            case 'loadScript':
                if (!editorEnabled) {
                    toAppend.push('The loadScript function is only available on the script editor page.');
                } else if (parameters.length !== 1) {
                    toAppend.push('The loadScript function expects 1 parameter.');
                } else if (!/^[a-zA-Z0-9]*$/.test(parameters[0])) {
                    toAppend.push('Invalid script name given.');
                } else {
                    toAppend.push(scriptInterpreter.loadScript(parameters[0]));
                }
                appendToHistory();
                break;
            case 'removeScript':
                if (!editorEnabled) {
                    toAppend.push('The removeScript function is only available on the script editor page.');
                } else if (parameters.length !== 1) {
                    toAppend.push('The removeScript function expects 1 parameter.');
                } else if (!/^[a-zA-Z0-9]*$/.test(parameters[0])) {
                    toAppend.push('Invalid script name given.');
                } else {
                    scriptInterpreter.removeScript(parameters[0]);
                }
                appendToHistory();
                break;
            case 'listScripts':
                if (parameters.length !== 0) {
                    toAppend.push('The removeScript function expects 0 parameters.');
                } else {
                    toAppend.push(scriptInterpreter.listScripts());
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
                } else if (Number(parameters[0]) < 0 || Number(parameters[0]) > 4) {
                    toAppend.push('New depth must be in the range [0, 4].');
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
        const piece = getPiece(square);
        if (playingAs === WHITE) {
            return piece === piece.toUpperCase();
        } else {
            return piece === piece.toLowerCase();
        }
    }

    function playMove(to: string, from?: string) {
        const nextPosition = from ? move(fen, from, to) : move(fen, selected, to);
        let result = from ? '[' + from + ',' + to + ']' : '[' + selected + ',' + to + ']';

        dispatch(setFEN(nextPosition));
        dispatch(setPreviousMoveFrom(selected));
        dispatch(setPreviousMoveTo(to));
        dispatch(setSelected(''));
        dispatch(setValidMoves([]));

        let tempHistory: Move[] = [...moveHistory];
        tempHistory.push({from: selected, to: to})
        dispatch(setMoveHistory(tempHistory));
        
        if (status(nextPosition).isFinished) {
            dispatch(setStarted(false));
            toAppend.push(finishGame(nextPosition));
        } else if (singlePlayer) {
            result += ' ' + playAiMove(nextPosition);
        }

        return result;
    }

    function playAiMove(position: string = fen) {
        const result = Object.entries(aiMove(position, aiDepth))[0];
        const from: string = result[0];
        const to: any = result[1];

        const nextPosition = move(position, from, to);

        let tempHistory: Move[] = [...moveHistory];
        tempHistory.push({from: from, to: to})
        dispatch(setMoveHistory(tempHistory));

        dispatch(setFEN(nextPosition));
        dispatch(setPreviousMoveFrom(from));
        dispatch(setPreviousMoveTo(to));
        if (status(nextPosition).isFinished) {
            dispatch(setStarted(false));
            toAppend.push(finishGame(nextPosition));
        }

        return '[' + from + ',' + to + ']';
    }

    function finishGame(position: string = fen) {
        const result = status(position);
        if (result.checkMate) {
            const matedKing = result.turn === 'black' ? 'k' : 'K';

            let mateSquare = '';
            const pieces = Object.entries(status(position).pieces);
            
            for (let i=0; i<pieces.length; i++) {
                if (pieces[i].includes(matedKing)) {
                    mateSquare = pieces[i][0];
                }
            }
            
            dispatch(setMateSquare(mateSquare));
            return result.turn === 'black' ? 'White wins!' : 'Black wins!';
        } else {
            return 'Draw';
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
        sendCommand: (command: string, script?: string) => { scriptBarrier(command, script) },
    }
    
}

export default TerminalInterpreter;