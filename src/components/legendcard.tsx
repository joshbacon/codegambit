import Method from "../models/method";
import MethodCategory from "../models/methodcategory";

function LegendCard(mc: MethodCategory, key: number) {

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
        { mc.methods.map((method: Method, key: number) => {
            return <h2
                key={key}
                onClick={() => scrollToElement(`${mc.id}-${method.mid}`)}
                className="font-semibold cursor-pointer hover:underline"
            >
                - {method.name}
            </h2>
        }) }
    </div>
}

export default LegendCard;