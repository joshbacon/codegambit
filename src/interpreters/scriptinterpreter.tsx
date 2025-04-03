import ScriptVariable from "../models/scriptvariable";

const ScriptInterpreter = (testing: boolean) => {

    let commandIndex: number = 0;
    let commands: string[] = [];
    let variables: ScriptVariable[] = [];

    function parseCode(script: string) {
        commands = script.split('\n').map(p => p.trim());;
    }

    function nextCommand() {
        if (commands.length === 0) return 'No script loaded.'; // empty script error message
        if (commandIndex === commands.length) return 'End of script.'; // no more commands
        return commands[commandIndex++];
    }

    function testScript(script: string) {
        parseCode(script);
    }

    function saveScript(name: string, script: string) {

    }

    function loadScript(name: string) {
        // pull the script from the local storage
        // pass it to parseCode
        return 'No script saved under given name.';
    }

    function removeScript(name:string) {
        
    }

    function listScripts() {
        // pull the list of the script names from local storage
    }

    function hasNextMove() {
        return commands.length > 0 && commandIndex !== commands.length;
    }

    return {
        testScript: function(script: string) { testScript(script) },
        saveScript: function(name: string, script: string) { saveScript(name, script); },
        loadScript: function(name: string) { return loadScript(name); },
        removeScript: function(name: string) { return removeScript(name) },
        listScripts: function() { return listScripts()},
        hasNextMove: function() { return hasNextMove()},
        nextMove: function() { return nextCommand() }
    }

}

export default ScriptInterpreter;