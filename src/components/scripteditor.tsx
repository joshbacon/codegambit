import { useEffect, useRef, useState } from "react";
import Interpreter from "../models/interpreter";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

function ScriptEditor() {

    // inlclude a flag that says it's the editing terminal?
    // - not sure if we need to limit any access yet just figure it out in testing (trying to break things for once!)
    // - also to include testing only functions (like testScript), so probably do need one

    // Additional functionality (not in the game terminal)
    // need to be able to save a script under a certain name
    // need to be able to run/test a script
    // - also need to pause it (it will have the delay... that'll be fun yay async)
    // - ... or be able to step back through it after it runs (want this with or without the delay)

    // existing functionality we'll need to keep from game terminal
    // - setPlayingAs
    // - setFromFEN
    // - resetBoard
    // - showValidMoves
    // - hideValidMoves
    // - setBoardTheme
    // - help
    // - clear

    // maybe setup an inheritance thing...
    // have the script terminal extend the game one and just add these
    // - because even though not all the game functions are used in the terminal,
    //   they will be used when interpreting the actual script

    const interpreter = Interpreter('');

    // Editor Variables

    const script = '';

    // Terminal Variables
    
    const [history, setHistory] = useState<string[]>(['Use the command testScript() to run your script']);

    const scrollRef = useRef<null | HTMLTableRowElement>(null);
    
    const [currentCommand, setCurrentCommand] = useState<string>("");
    const [partialCommand, setPartialCommand] = useState<string>("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [commandSearchIndex, setCommandSearchIndex] =  useState<number>(commandHistory.length);

    useEffect(() => {
        setCommandSearchIndex(commandHistory.length);
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
    }, [commandHistory]);

    function updateTerminalInput(newValue: string) {
        setCurrentCommand(newValue);
        setPartialCommand(newValue);
        setCommandSearchIndex(commandHistory.length);
    }

    function checkTerminalKey(key: string) {
        if (key === 'ArrowUp') {
            if (commandSearchIndex > 0) {
                const temp = commandSearchIndex;
                setCommandSearchIndex(temp-1);
                setCurrentCommand(commandHistory[temp-1]);
            }
        } else if (key === 'ArrowDown') {
            if (commandSearchIndex < commandHistory.length) {
                const temp = commandSearchIndex;
                setCommandSearchIndex(temp+1);
                if (temp + 1 == commandHistory.length) {
                    setCurrentCommand(partialCommand);
                } else {
                    setCurrentCommand(commandHistory[temp+1]);
                }
            }
        } else if (key === 'Enter') {
            setHistory([...history, currentCommand]);
            setCommandHistory([...commandHistory, currentCommand]);
            setCurrentCommand("");
            setPartialCommand("");
        }
    }

    return <div className="flex flex-col w-4/5 h-[80%] rounded-2xl overflow-hidden outline-1 outline-stone-700">
        
        <CodeMirror
            value={script}
            theme={vscodeDark}
            className="w-full h-full max-h-[600px] overflow-y-scroll"
        />

        <div className="flex flex-col w-full h-48 text-green-700 bg-black shadow-[0_0_25px_0_black]">
            <table className="relative p-2 flex h-[calc(100%-49px)] overflow-y-scroll">
                <tbody>
                    { history.map((value, key) => {
                        return <tr key={key}>
                            <td>{value}</td>
                        </tr>
                    }) }
                    <tr ref={scrollRef} />
                </tbody>
            </table>
            <div className="flex items-center w-full px-2 border-t-1">
                <h1 className="text-1xl font-bold">{'>'}</h1>
                <input
                    type="text"
                    autoFocus={false}
                    autoCapitalize="false"
                    autoCorrect="false"
                    autoComplete="false"
                    spellCheck="false"
                    value={currentCommand}
                    onChange={(e) => updateTerminalInput(e.target.value)}
                    onKeyUp={(e) => checkTerminalKey(e.key)}
                    className="h-12 ml-3 w-full focus:outline-0"
                />
            </div>
        </div>
    </div>
}

export default ScriptEditor;