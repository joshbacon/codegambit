import Command from "../models/command";
import CommandCategory from "../models/commandcategory";

function LegendCard(mc: CommandCategory, key: number) {

    function scrollToElement(id: string) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.className = `${element.className} bg-yellow-400/30`;
          setTimeout(() => {
              element.className = element.className.replace(' bg-yellow-400/30', '');
          }, 1000);
        }
    }

    return <div key={key} className="border-t-2 border-green-700 p-3">
        <h2 className="font-bold text-xl">{mc.name}</h2>
        { mc.commands.map((command: Command, key: number) => {
            return <h2
                key={key}
                onClick={() => scrollToElement(`${mc.id}-${command.cid}`)}
                className="font-semibold cursor-pointer hover:underline"
            >
                - {command.name}
            </h2>
        }) }
    </div>
}

export default LegendCard;