import ScriptVariable from "../models/scriptvariable";
import { setScript } from "../reducers/script";
import { useAppDispatch } from '../store/hooks';

class ScriptInterpreter {
    dispatch = useAppDispatch();
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

    public resetScript() {
        this._commandIndex = 0;
    }

    private parseScript(script: string) {
        // add a cleanScript function
        // then bundle the command blocks (conditionals) in this function
        this._commands = script.split('\n').map(p => p.trim()).filter(p => p != '' && !p.startsWith('//'));
        //console.log(script.split('\n').map(p => p.trim()).filter(p => p != '' && !p.startsWith('//')));
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
            const scripts: { [key: string]: any } = JSON.parse(storage);
            this.parseScript(scripts[name]);
            this.dispatch(setScript(scripts[name]));
            return name;
        } else {
            return `No script saved under ${name}`;
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
        return this._commandIndex < this._commands.length;
    }

    public nextCommand() : string {
        if (this._commands.length === 0) return 'No script loaded.'; // empty script error message
        if (this._commandIndex === this._commands.length) return 'End of script.'; // no more commands
        return this._commands[this._commandIndex++];
    }

}


export default ScriptInterpreter;