import Board from "../components/board";
import NavHeader from "../components/header";
import ScriptEditor from "../components/scripteditor";

function ScriptingPage() {

    return <div className="flex flex-col w-full min-h-screen justify-around items-center">
        <NavHeader />
        <section className="h-full my-auto w-full flex flex-col py-5 gap-5 justify-center items-center lg:grid lg:grid-cols-2 lg:place-items-center">
            <Board />
            <ScriptEditor />
        </section>
    </div>
}

export default ScriptingPage;