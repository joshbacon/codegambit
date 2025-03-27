import { useEffect, useRef, useState } from "react";
import TerminalInterpreter from "../interpreters/terminalinterpreter";

function Terminal() {

    const interpreter = TerminalInterpreter(false, 'type help(method) to see how to use a given method or check out the documentation for a list of commands.');

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

    function updateInput(newValue: string) {
        setCurrentCommand(newValue);
        setPartialCommand(newValue);
        setCommandSearchIndex(interpreter.commandHistory().length);
    }

    function checkKey(key: string) {
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
            setCommandSearchIndex(interpreter.commandHistory().length);
        }
    }


    return <div className="flex flex-col w-4/5 min-w-80 h-72 text-green-700 bg-black rounded-2xl shadow-[10px_10px_20px_0_black,-10px_-10px_20px_0_rgba(64,64,64,0.5)]">
        <table className="relative p-2 flex h-[calc(100%-49px)] overflow-y-scroll">
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
                onChange={(e) => updateInput(e.target.value)}
                onKeyUp={(e) => checkKey(e.key)}
                className="h-12 ml-3 w-full focus:outline-0"
            />
        </div>
    </div>
}

export default Terminal;