import Command from "../models/command";
import CommandCategory from "../models/commandcategory";


function CommandCategoryCard(mc: CommandCategory, key: number) {
    return <div key={key} className="w-lg bg-neutral-900 rounded-2xl p-3 flex flex-col gap-3">
        <h2 className="font-bold text-2xl">{mc.name}</h2>
        { mc.commands.map(
            (command: Command, key: number) => {
                return <div key={key}  id={`${mc.id}-${command.cid}`} className="rounded-xl bg-neutral-800 p-2 transition-all duration-400 delay-100 ease-out">
                    <h2 className="font-semibold text-xl">{command.name}</h2>
                    <p>paramerters: {command.params}</p>
                    <p>example: {command.example}</p><br/>
                    <p>{command.description}</p>
                </div> 
            }
        ) }
    </div>
}

export default CommandCategoryCard;