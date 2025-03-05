import Method from "../models/method";
import MethodCategory from "../models/methodcategory";


function MethodCategoryCard(mc: MethodCategory, key: number) {
    return <div key={key} className="w-lg bg-neutral-900 rounded-2xl p-3 flex flex-col gap-3">
        <h2 className="font-bold text-2xl">{mc.name}</h2>
        { mc.methods.map(
            (method: Method, key: number) => {
                return <div key={key}  id={`${mc.id}-${method.mid}`} className="rounded-xl bg-neutral-800 p-2 transition-all duration-400 delay-100 ease-out">
                    <h2 className="font-semibold text-xl">{method.name}</h2>
                    <p>paramerters: {method.params}</p>
                    <p>example: {method.example}</p><br/>
                    <p>{method.description}</p>
                </div> 
            }
        ) }
    </div>
}

export default MethodCategoryCard;