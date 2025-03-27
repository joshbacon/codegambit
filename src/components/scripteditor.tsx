import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import TerminalInterpreter from "../interpreters/terminalinterpreter";
import Terminal from "./terminal";

function ScriptEditor() {

    const interpreter = TerminalInterpreter(true, 'Use the command testScript() to watch your script run');

    // Editor Variables

    const [script, setScript] = useState<string>('');


    // Terminal Variables

    const scrollRef = useRef<null | HTMLTableRowElement>(null);
    
    const [currentCommand, setCurrentCommand] = useState<string>("");
    const [partialCommand, setPartialCommand] = useState<string>("");
    const [commandSearchIndex, setCommandSearchIndex] =  useState<number>(interpreter.commandHistory().length);

    useEffect(() => {
        setCommandSearchIndex(interpreter.commandHistory().length);
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }
    }, [interpreter.commandHistory()]);

    function updateTerminalInput(newValue: string) {
        setCurrentCommand(newValue);
        setPartialCommand(newValue);
        setCommandSearchIndex(interpreter.commandHistory().length);
    }

    function checkTerminalKey(key: string) {
        if (key === 'ArrowUp') {
            if (commandSearchIndex > 0) {
                const temp = commandSearchIndex;
                setCommandSearchIndex(temp-1);
                setCurrentCommand(interpreter.commandHistory()[temp-1]);
            }
        } else if (key === 'ArrowDown') {
            if (commandSearchIndex < interpreter.commandHistory().length) {
                const temp = commandSearchIndex;
                setCommandSearchIndex(temp+1);
                if (temp + 1 == interpreter.commandHistory().length) {
                    setCurrentCommand(partialCommand);
                } else {
                    setCurrentCommand(interpreter.commandHistory()[temp+1]);
                }
            }
        } else if (key === 'Enter') {
            interpreter.sendCommand(currentCommand);
            setCurrentCommand("");
            setPartialCommand("");
        }
    }

    return <div className="flex flex-col w-4/5 h-[80%] rounded-2xl overflow-hidden outline-1 outline-stone-700">
        
        <CodeMirror
            value={script}
            onChange={(newScript) => setScript(newScript)}
            theme={vscodeDark}
            className="w-full h-full max-h-[600px] overflow-y-scroll"
        />

        <div className="flex flex-col w-full h-48 text-green-700 bg-black shadow-[0_0_25px_0_black]">
            <table className="relative p-2 flex  h-[100px] overflow-y-scroll">
                <tbody>
                    { interpreter.history().map((value, key) => {
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