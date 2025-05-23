import ScriptVariable from "../models/scriptvariable";
import DocData from '../data/docs.json';
import { setScript } from "../reducers/script";
import { useAppDispatch } from '../store/hooks';
import CommandCategory from "../models/commandcategory";
import CommandBlock from "../models/commandblock";
import Move from "../models/move";

class ScriptInterpreter {

    getLastMove?: () => Move;
    
    dispatch = useAppDispatch();

    _blockIndex: number = 0;
    _commandIndex: number = 0;
    _commandBlocks: CommandBlock[] = [];
    _variables: ScriptVariable[] = [];

    _commandList: string[] = [];
    _editingEnabled: boolean = false;

    constructor(editing: boolean, callback?: Function) {
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
        if (callback) {
            this.getLastMove = () => callback();
        }
    }

    get commands() : string[] {
        return this._commandBlocks[this._blockIndex].commands;
    }

    get blocks() : CommandBlock[] {
        return this._commandBlocks;
    }

    // Handling functions

    public resetScript() {
        this._blockIndex = 0;
        this._commandIndex = 0;
    }

    private parseScript(script: string) : number {
        
        let blocks: CommandBlock[] = [];
        const lines: string[] = this.cleanScript(script);

        let i: number = 0;
        if (!/^\s*if\s*\(/.test(lines[i])) blocks.push({condition: '', commands: []} as CommandBlock)
        while (i < lines.length) {
            if (/^\s*if\s*\(/.test(lines[i])) {
                let condition: string = lines[i];
                try {
                    condition = condition.split('(')[1].split(')')[0];
                } catch (e) {
                    return 3; // error code for invalid conditional syntax
                }
                blocks.push({condition: condition, commands: []} as CommandBlock);
            } else if (lines[i].includes('}') && i < lines.length - 2 && !/^\s*if\s*\(/.test(lines[i+1])) {
                blocks.push({condition: '', commands: []} as CommandBlock);
            } else {
                if (this.isNotCommand(lines[i])) {
                    return 2; // error code for invalid function
                }
                blocks[blocks.length-1].commands.push(lines[i]);
            }
            i++;
        }
        // console.log(blocks.filter((b: CommandBlock) => b.commands.length > 0));
        this._commandBlocks = blocks.filter((b: CommandBlock) => b.commands.length > 0);

        return 0;
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


    // Helper Functions

    private cleanScript(script: string) : string[] {
        return script.split('\n').filter(p => p != '' && !p.startsWith('//')).map(p => p.trim());
    }

    private isNotCommand(command: string) : boolean {
        return !this._commandList.includes(command.split('(')[0]);
    }

    private evaluateCondition(condition: string) : boolean {
        if (condition === '') return true;

        if (condition.includes('&&')) {
            const temp = condition.split('&&').map(c => c.trim());
            return this.evaluateCondition(temp[0] && temp[1]);
        }

        if (condition.includes('||')) {
            const temp = condition.split('||').map(c => c.trim());
            return this.evaluateCondition(temp[0] || temp[1]);
        }

        // TODO: lastMove doesn't seem to be coming through (but it's now tracking properly at least)

        if (condition.includes('==')) {
            const temp = condition.split('==').map(c => c.trim());
            console.log(`temp ${temp}`);
            console.log(this.getLastMove);
            if (this.getLastMove) {
                console.log(`lastMove ${this.getLastMove()}`);
                const opA = temp[0].trim() === 'OPPLASTMOVE' ? `[${this.getLastMove().from},${this.getLastMove().to}]` : temp[0].replace(/\s/g, "");
                const opB = temp[1].trim() === 'OPPLASTMOVE' ? `[${this.getLastMove().from},${this.getLastMove().to}]` : temp[1].replace(/\s/g, "");
                return opA === opB;
            }
            return false;
        }

        if (condition.includes('!=')) {
            const temp = condition.split('!=').map(c => c.trim());
            console.log(`temp ${temp}`);
            if (this.getLastMove) {
                console.log(`lastMove ${this.getLastMove()}`);
                const opA = temp[0].trim() === 'OPPLASTMOVE' ? `[${this.getLastMove().from},${this.getLastMove().to}]` : temp[0].replace(/\s/g, "");
                const opB = temp[1].trim() === 'OPPLASTMOVE' ? `[${this.getLastMove().from},${this.getLastMove().to}]` : temp[1].replace(/\s/g, "");
                return opA === opB;
            }
            return false;
        }

        return false;
    }


    // Runtime functions

    public hasNextCommand() : boolean {
        // If at end of current block
        if (this._commandIndex === this._commandBlocks[this._blockIndex].commands.length) {
            // See if there is another block with a true condition
            let counter: number = 0;
            do {
                if (this._blockIndex + counter === this.blocks.length) return false;
                counter++;
            } while (
                !this.evaluateCondition(this.blocks[this._blockIndex + counter].condition)
            );
        }
        return true; // Else, there are more commands to run in the current block
    }

    public nextCommand() : string {
        
        if (this._commandBlocks.length === 0) return 'No script loaded.'; // empty script error message

        if (this._commandIndex === this._commandBlocks[this._blockIndex].commands.length) {
            this._commandIndex = 0;
            do {
                this._blockIndex++;
            } while (!this.evaluateCondition(this.blocks[this._blockIndex].condition));
        }

        if (this._blockIndex === this._commandBlocks.length) return 'End of script.'; // no more commands

        return this._commandBlocks[this._blockIndex].commands[this._commandIndex++];
    }

    public checkCondition(condition: string) : boolean {
        if (condition) return false;
        return false;
    }

}


export default ScriptInterpreter;