import { useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import DocData from '../data/docs.json';
import DocLookup from '../data/docLookup.json';
// import { move, status, moves, aiMove, getFen } from 'js-chess-engine';
import Command from "../models/command";

const TerminalInterpreter = (editorEnabled: boolean, historyPretext: string) => {
  
    //const { inGame, playingAs, selected, aiLevel, game, history, commands } = useSelector(state => state.game);
  
    //const dispatch = useDispatch();
  
    // const WHITE = 'w';
    // const BLACK = 'b';
  
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
            case 'help':
                if (parameters.length != 1) {
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