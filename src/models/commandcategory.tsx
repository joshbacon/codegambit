import Command from "./command";

type CommandCategory = {
    id: number;
    name: string;
    commands: Command[];
};

export default CommandCategory;