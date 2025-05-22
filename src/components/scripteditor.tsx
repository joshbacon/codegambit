import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from '@codemirror/lang-javascript';
import TerminalInterpreter from "../interpreters/terminalinterpreter";
import { useAppSelector } from "../store/hooks";

function ScriptEditor() {

    const interpreter = TerminalInterpreter(true, 'Use the command testScript() to watch your script run or loadScript(example) for instructions');

    // Editor Variables

    const [script, setScript] = useState<string>(exampleScript);
    const { loadedScript } = useAppSelector(state => state.script);

    useEffect(() => {
        setScript(loadedScript);
    }, [loadedScript]);

    useEffect(() => {
        const recentScript: string | null = localStorage.getItem("recentScript");
        if (recentScript && recentScript != 'example') {
            interpreter.sendCommand(`loadScript(${recentScript})`);
        } else {
            setScript(exampleScript);
        }
    }, []);

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
            if (currentCommand == 'loadScript(example)') {
                setScript(exampleScript);
            } else {
                interpreter.sendCommand(currentCommand, script);
            }
            setCurrentCommand("");
            setPartialCommand("");
        }
    }

    return <div className="w-4/5">
        <div className="flex flex-col w-full rounded-2xl overflow-hidden outline-1 outline-stone-700">
            
            <CodeMirror
                value={script}
                onChange={(newScript) => setScript(newScript)}
                theme={vscodeDark}
                extensions={[javascript({ jsx: true })]}
                className="w-full h-full max-h-[500px] min-h-60 overflow-y-scroll"
            />

            <div className="flex flex-col w-full h-64 text-green-700 bg-black shadow-[0_0_25px_0_black]">
                <table className="relative p-2 flex w-full h-full text-wrap overflow-y-scroll">
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
    </div>
}

const exampleScript: string = `//
// Welcome to the scripting page!
// Here is everything you need to know about scripting.
//

//
// Writing a script allows you to make a series of
// moves according to custom logic.
// Have a favourite opening? Create a script to
// save yourself from typing it in over and over.
//

//
// Functionality:
//
// Think of the script editor as the terminal that
// won't run the commands until you tell it to.
// 
// This means any command* available to you in the
// terminal can be used in your script.
// Including an extra Termination command.
//
//  - Use the command exitScript() to cancel a script
//
// This can be use to avoid a losing position if
// your opponent makes an unexpected move.
//
// * some commands listed under Gameplay are not
//    available while scripting:
//   - startGame()
//   - setFromFEN()
//   - resetBoard()
//
//
// You also have access to some built in variables.
//
//    OPPLASTMOVE - allows you to check how your
//               opponent responded to your last move
//
//
//
// Error Codes:
//
// When you load a script, a number will be returned
// indicating the success/failure of the build process.
//
// - 0: indicates the script was loaded successfully
// - 1: indicates there is no script saved under that name
// - 2: indicates an invalid function was found
// - 3: indicates a syntax error in a conditional block
// - 4: indicates a syntax error in a loop
//
// Note parameters are not checked during the load process.
// Parameters are checked during runtime so be sure to
// test your scripts!
//


//
// Below is a simple implementation for a basic
// Ponziani variation.
//

// Start with E4 then bring your knight out
select(E2)
move(E4)
select(G1)
move(F3)

// Check opponents response
if (OPPLASTMOVE == [D5,E4]) {
  move(F3,E5)
  exitScript()
}

select(C2)
move(C3)
select(D2)
move(D4)



`;

export default ScriptEditor;