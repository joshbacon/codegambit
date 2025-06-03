import ScriptVariable from "../models/scriptvariable";
import DocData from '../data/docs.json';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import CommandCategory from "../models/commandcategory";
import CommandBlock from "../models/commandblock";
import { useEffect, useState } from "react";
import { setScript } from "../reducers/script";

const ScriptInterpreter = () => {

    const dispatch = useAppDispatch();
    const {  moveHistory } = useAppSelector(state => state.game);

    const [blockIndex, setBlockIndex] = useState<number>(0);
    const [commandIndex, setCommandIndex] = useState<number>(0);
    const [commandBlocks, setCommandBlocks] = useState<CommandBlock[]>([]);
    const [elseCondition, setElseCondition] = useState<boolean>(true);
    const [variables, setVariables] = useState<ScriptVariable[]>([]);

    const  [validCommandList, setValidCommandList] = useState<string[]>([]);

    useEffect(() => {
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
        setValidCommandList(tempList);
    }, []);

    // Handling functions

    function resetScript() {
        setBlockIndex(0);
        setCommandIndex(0);
    }

    function parseScript(script: string) : number {
        
        let blocks: CommandBlock[] = [];
        const lines: string[] = cleanScript(script);

        let i: number = 0;
        if (!/^\s*if\s*\(/.test(lines[i])) blocks.push({condition: '', commands: []} as CommandBlock)
        while (i < lines.length) {
            if (/\s*if\s*\(/.test(lines[i])) {
                let condition: string = lines[i];
                try {
                    condition = condition.split('(')[1].split(')')[0];
                } catch (e) {
                    return 3; // error code for invalid conditional syntax
                }
                blocks.push({condition: condition, commands: []} as CommandBlock);
            } else if (/^\s*}\s*else\s*{\s*$/.test(lines[i])) {
                blocks.push({condition: 'else', commands: []} as CommandBlock);
            } else if (lines[i].includes('}') && i < lines.length - 2 && !/^\s*if\s*\(/.test(lines[i+1])) {
                blocks.push({condition: '', commands: []} as CommandBlock);
            } else {
                if (isNotCommand(lines[i])) {
                    return 2; // error code for invalid function
                }
                blocks[blocks.length-1].commands.push(lines[i]);
            }
            i++;
        }
        // console.log(blocks.filter((b: CommandBlock) => b.commands.length > 0));
        setCommandBlocks(blocks.filter((b: CommandBlock) => b.commands.length > 0));

        return 0;
    }

    function runScript(script: string) : boolean {
        if (loadScript(script) === script) {
            resetScript();
            return true;
        } else {
            return false;
        }
    }

    function testScript(script: string) : boolean {
        parseScript(script);
        return true;
    }

    function saveScript(name: string, script: string) : string {
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

    function loadScript(name: string) : string {
        const storage: string | null = localStorage.getItem('scripts');
        if (storage) {
            localStorage.setItem("recentScript", name);
            const scripts: { [key: string]: any } = JSON.parse(storage);
            const parseResult = parseScript(scripts[name]);
            dispatch(setScript(scripts[name]));
            return `Script load result ${parseResult}`;
        } else {
            return 'Script load result 1';
        }
    }

    function removeScript(name: string) : string {
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

    function listScripts() : string {
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

    function cleanScript(script: string) : string[] {
        return script.split('\n').filter(p => p != '' && !p.startsWith('//')).map(p => p.trim());
    }

    function isNotCommand(command: string) : boolean {
        return !validCommandList.includes(command.split('(')[0]);
    }

    function evaluateCondition(index: number, condition: string) : boolean {
        if (condition === '') return true;
        if (condition === 'else' && index > 0) return elseCondition;

        if (condition.includes('&&')) {
            const temp = condition.split('&&').map(c => c.trim());
            return evaluateCondition(index, temp[0]) && evaluateCondition(index, temp[1]);
        }

        if (condition.includes('||')) {
            const temp = condition.split('||').map(c => c.trim());
            return evaluateCondition(index, temp[0]) || evaluateCondition(index, temp[1]);
        }

        if (condition.includes('==')) {
            const temp = condition.split('==').map(c => c.trim());
            if (getLastMove) {
                const opA = temp[0].trim() === 'OPPLASTMOVE' ? getLastMove() : temp[0].replace(/\s/g, "");
                const opB = temp[1].trim() === 'OPPLASTMOVE' ? getLastMove() : temp[1].replace(/\s/g, "");
                return opA === opB;
            }
            return false;
        }

        if (condition.includes('!=')) {
            const temp = condition.split('!=').map(c => c.trim());
            if (getLastMove) {
                const opA = temp[0].trim() === 'OPPLASTMOVE' ? getLastMove() : temp[0].replace(/\s/g, "");
                const opB = temp[1].trim() === 'OPPLASTMOVE' ? getLastMove() : temp[1].replace(/\s/g, "");
                return opA !== opB;
            }
            return false;
        }

        return false;
    }

    function getLastMove() : string {
        if (moveHistory.length === 0) return '';
        return `[${moveHistory[moveHistory.length-1].from},${moveHistory[moveHistory.length-1].to}]`;
    }


    // Runtime functions

    function hasNextCommand() : boolean {
        // If at end of current block
        if (commandIndex === commandBlocks[blockIndex].commands.length) {
            // See if there is another block with a true condition
            let counter: number = 0;
            do {
                counter++;
                if (blockIndex + counter >= commandBlocks.length) {
                    return false;
                }
            } while (
                !evaluateCondition(blockIndex+counter, commandBlocks[blockIndex + counter].condition)
            );
        }
        return true; // Else, there are more commands to run in the current block
    }

    function nextCommand() : string {
        
        if (commandBlocks.length === 0) return 'No script loaded.'; // empty script error message

        let nextBlockIndex: number = blockIndex;
        let nextCommandIndex: number = commandIndex;

        if (nextCommandIndex >= commandBlocks[blockIndex].commands.length) {
            nextCommandIndex = 0;
            let nextCondition = false;
            do {
                nextBlockIndex++;
                nextCondition = !evaluateCondition(nextBlockIndex, commandBlocks[nextBlockIndex].condition);
                setElseCondition(elseCondition && nextCondition);
            } while (nextBlockIndex < commandBlocks.length && nextCondition);
        }

        if (nextBlockIndex === commandBlocks.length) return 'End of script.'; // no more commands

        if (commandBlocks[nextBlockIndex].condition === 'else') setElseCondition(false);
        const result: string = commandBlocks[nextBlockIndex].commands[nextCommandIndex];
        setBlockIndex(nextBlockIndex);
        setCommandIndex(nextCommandIndex+1);
        return result;
    }

    return {
        resetScript: () => { resetScript() },
        runScript: (script: string) => { return runScript(script) },
        testScript: (script: string) => { return testScript(script) },
        saveScript: (name: string, script: string) => { return saveScript(name, script) },
        loadScript: (name: string) => { return loadScript(name) },
        removeScript: (name: string) => { return removeScript(name) },
        listScripts: () => { return listScripts() },
        hasNextCommand: () => { return hasNextCommand() },
        nextCommand: () => { return nextCommand() },
    }
}

export default ScriptInterpreter;