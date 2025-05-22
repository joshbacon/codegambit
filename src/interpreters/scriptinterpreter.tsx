import ScriptVariable from "../models/scriptvariable";
import DocData from '../data/docs.json';
import { setScript } from "../reducers/script";
import { useAppDispatch } from '../store/hooks';
import CommandCategory from "../models/commandcategory";

class ScriptInterpreter {
    
    dispatch = useAppDispatch();

    _blockIndex: number = 0;
    _commandIndex: number = 0;
    _commandBlocks: string[][] = [];
    _variables: ScriptVariable[] = [];

    _commandList: string[] = [];
    _editingEnabled: boolean = false;

    constructor(editing: boolean) {
        const tempList = [];
        const data: CommandCategory[] = DocData;
        for (let i=0; i < data.length; i++) {
            for (let j=0; j < data[i].commands.length; j++) {
                const currCommand = data[i].commands[j].name.split('(')[0];
                if (!['startGame', 'setFromFEN', 'resetBoard'].includes(currCommand)) {
                    tempList.push(data[i].commands[j].name.split('(')[0]);
                }
            }
        }
        tempList.push('exitScript') // Add the extra scripting function
        this._commandList = tempList;
        this._editingEnabled = editing;
    }

    get commands() : string[] {
        return this._commandBlocks[this._blockIndex];
    }

    get blocks() : string[][] {
        return this._commandBlocks;
    }

    // Handling functions

    public resetScript() {
        this._blockIndex = 0;
        this._commandIndex = 0;
    }

    private parseScript(script: string) : number {
        
        let errorFound : number = 0;
        let blocks : string[][] = [];
        const lines : string[] = this.cleanScript(script);

        for (let i=0; i < lines.length; i++) {

            // put all the "outside conditional commands" in one block each?
            // so like the example script would be 3 blocks (setup, conditional, secondary pawn moves) instead of 9 blocks
            // - then we could attach a "condition result" to each one
            // -- "outside conditional" command blocks would just be set to true
            // -- and conditional blocks would have the given condition
            // * this would make the 'else if' functionality easier too... just attach the next condition to it.
            //   no need to track indicies because they would all still run sequentially, just skipping some
            //   (until we add loops at least, but we can probably hoist that functionality when we need to)
            //   The 'else' functionality would be tricky though, would have to NOT all the leading IF conditions

            // ok yeah do that...
            // would need to create a CommandBlock data type
            // this.condition: boolean
            // this.commands: string[]
            // 
            // then change _commanBlocks to a type of CommandBlock[]
            
            // Will need a function to test the condition, then call it in nextCommand() and
            //  keep incrementing this._blockIndex while the conditions are false until a true conditions is found or the script ends

            // NOTE: current implementation does not handle nested conditionals properly (just )

            // Add a new block for the next round of commands
            blocks.push([]);
            
            // Check if it's the start of a conditional block
            if (/^\s*if\s*\(/.test(lines[i])) {
                // Add all the subsequent commands to one block
                while (!lines[++i].includes('}')) {
                    if (i === lines.length) {
                        errorFound = 3; // error code for improper conditional syntax
                        break;
                    } else if (this.isNotCommand(lines[i])) {
                        errorFound = 2; // error code for invalid function
                        i = lines.length;
                        break;
                    }
                    blocks[blocks.length-1].push(lines[i]);
                }
            } else {
                if (this.isNotCommand(lines[i])) {
                    errorFound = 2; // error code for invalid function
                    break;
                }
                // Otherwise, add the single command to its own block
                blocks[blocks.length-1].push(lines[i]);
            }

        }
        console.log(blocks)

        if (errorFound === 0) {
            this._commandBlocks = blocks;
        }

        return errorFound;
    }

    private isNotCommand(command: string) : boolean {
        return !this._commandList.includes(command.split('(')[0]);
    }

    private cleanScript(script: string) : string[] {
        return script.split('\n').filter(p => p != '' && !p.startsWith('//')).map(p => p.trim());
    }

    public runScript(script: string) : boolean {
        if (this.loadScript(script) === script) {
            this.resetScript();
            return true;
        } else {
            return false;
        }
    }

    public testScript(script: string) : boolean {
        this.parseScript(script);
        return true;
    }

    public saveScript(name: string, script: string) : string {
        const scripts: { [key: string]: any } = {};
        const storage: string | null = localStorage.getItem('scripts');
        if (storage) {
            const temp: { [key: string]: any } = JSON.parse(storage);
            if (Object.entries(temp).length > 0) {
                Object.entries(temp).forEach(([n, s]) => {scripts[n] = s;});
            }
        }
        scripts[name] = script;
        localStorage.setItem('scripts', JSON.stringify(scripts));
        return `Script saved under ${name}.`;
    }

    public loadScript(name: string) : string {
        const storage: string | null = localStorage.getItem('scripts');
        if (storage) {
            localStorage.setItem("recentScript", name);
            const scripts: { [key: string]: any } = JSON.parse(storage);
            const parseResult = this.parseScript(scripts[name]);
            this.dispatch(setScript(scripts[name]));
            return `Script load result ${parseResult}`;
        } else {
            return 'Script load result 1';
        }
    }

    public removeScript(name: string) : string {
        const scripts: { [key: string]: any } = {};
        const storage: string | null = localStorage.getItem('scripts');
        if (storage) {
            const temp: { [key: string]: any } = JSON.parse(storage);
            if (Object.entries(temp).length > 0) {
                Object.entries(temp).forEach(([n, s]) => {
                    if (n !== name) {
                        scripts[n] = s;
                    }
                });
            }
        }
        localStorage.setItem('scripts', JSON.stringify(scripts));
        return `Script ${name} deleted.`;
    }

    public listScripts() : string {
        const storage: string | null = localStorage.getItem('scripts');
        if (storage) {
            const temp: { [key: string]: any } = JSON.parse(storage);
            if (Object.keys(temp).length > 0) {
                return `[${Object.keys(temp).toString()}]`;
            }
        }
        return 'No saved scripts.';
    }

    // Runtime functions

    public hasNextCommand() : boolean {
        return this._commandIndex < this._commandBlocks[this._blockIndex].length;
    }

    public nextCommand() : string {
        
        if (this._commandBlocks.length === 0) return 'No script loaded.'; // empty script error message

        if (this._commandIndex === this._commandBlocks[this._blockIndex].length) {
            this._commandIndex = 0;
            this._blockIndex++;
        }

        if (this._blockIndex === this._commandBlocks.length) return 'End of script.'; // no more commands

        return this._commandBlocks[this._blockIndex][this._commandIndex++];
    }

    public checkCondition(condition: string) : boolean {
        if (condition) return false;
        return false;
    }

}


export default ScriptInterpreter;