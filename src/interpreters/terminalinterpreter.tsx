import { useState } from "react";
import DocData from '../data/docs.json';
import DocLookup from '../data/docLookup.json';
// import { move, status, moves, aiMove, getFen } from 'js-chess-engine';
import Command from "../models/command";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setBoardTheme } from "../reducers/visual";
import { setStarted, setAIDepth, setPlayingAs } from "../reducers/game";

const TerminalInterpreter = (editorEnabled: boolean, historyPretext: string) => {
  
    const { fen, started, playingAs } = useAppSelector(state => state.game);

    const dispatch = useAppDispatch();
  
    const WHITE = 'w';
    const BLACK = 'b';
  
    // let singlePlayer = true;

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
            case 'startGame':
                if (started) {
                    toAppend.push('A match is already in session.');
                }
                if (parameters.length > 0) {
                    toAppend.push('The gameStart function expects 0 parameters.');
                } else {
                    dispatch(setStarted(true));
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