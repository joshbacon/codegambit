import ScriptVariable from "../models/scriptvariable";

class ScriptInterpreter {

    _commandIndex: number = 0;
    _commands: string[] = [];
    _variables: ScriptVariable[] = [];

    _editingEnabled: boolean = false;

    constructor(editing: boolean) {
        this._editingEnabled = editing;
    }

    get commands() {
        return this._commands;
    }

    // Handling functions

    private parseScript(script: string) {
        this._commands = script.split('\n').map(p => p.trim()).filter(p => p != '');
    }

    public testScript(script: string) : boolean {
        this.parseScript(script);
        return true;
    }

    public saveScript(name: string, script: string) {

    }

    public loadScript(name: string) {
        // pull the script from the local storage
        // pass it to parseCode
        return 'No script saved under given name.';
    }

    public removeScript(name: string) {
        
    }

    public listScripts() : string {
        // pull the list of the script names from local storage
        return 'No saved scripts';
    }

    // Runtime functions

    public hasNextCommand() : boolean {
        return this._commandIndex < this._commands.length;
    }

    public nextCommand() : string {
        if (this._commands.length === 0) return 'No script loaded.'; // empty script error message
        if (this._commandIndex === this._commands.length) return 'End of script.'; // no more commands
        return this._commands[this._commandIndex++];
    }

}

// const ScriptInterpreter2 = (testing: boolean) => {

//     let commandIndex: number = 0;
//     let commands: string[] = [];
//     let variables: ScriptVariable[] = [];

//     function parseCode(script: string) {
//         commands = script.split('\n').map(p => p.trim());;
//     }

//     function nextCommand() {
//         if (commands.length === 0) return 'No script loaded.'; // empty script error message
//         if (commandIndex === commands.length) return 'End of script.'; // no more commands
//         return commands[commandIndex++];
//     }

//     function testScript(script: string) {
//         parseCode(script);
//     }

//     function saveScript(name: string, script: string) {

//     }

//     function loadScript(name: string) {
//         // pull the script from the local storage
//         // pass it to parseCode
//         return 'No script saved under given name.';
//     }

//     function removeScript(name:string) {
        
//     }

//     function listScripts() {
//         // pull the list of the script names from local storage
//     }

//     function hasNextMove() {
//         return commands.length > 0 && commandIndex !== commands.length;
//     }

//     return {
//         testScript: function(script: string) { testScript(script) },
//         saveScript: function(name: string, script: string) { saveScript(name, script); },
//         loadScript: function(name: string) { return loadScript(name); },
//         removeScript: function(name: string) { return removeScript(name) },
//         listScripts: function() { return listScripts()},
//         hasNextMove: function() { return hasNextMove()},
//         nextMove: function() { return nextCommand() }
//     }

// }

export default ScriptInterpreter;