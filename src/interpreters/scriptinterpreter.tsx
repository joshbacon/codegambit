import ScriptVariable from "../models/scriptvariable";

const ScriptInterpreter = (testing: boolean, runCallback: Function) => {

    let commandIndex: number = -1;
    let commands: string[] = [];
    let variables: ScriptVariable[] = [];

    function parseCode(script: string) {
        // figure out what the syntax will look like and populate the commands and variables variables
    }

    function nextCommand() {
        if (commands.length === 0) return; // empty script error message
        if (commandIndex === commands.length) return; // no more commands
        return commands[commandIndex++];
    }

    function testScript() {

    }

    function saveScript(name: string) {

    }

    function loadScript(name: string) {

    }

    return {
        setScript: function(newScript: string) { parseCode(newScript); }
    }

}

export default ScriptInterpreter;