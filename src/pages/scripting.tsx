import Board from "../components/board";
import NavHeader from "../components/header";
import ScriptEditor from "../components/scripteditor";

function ScriptingPage() {

    return <div className="flex flex-col gap-5 w-screen h-screen justify-around items-center">
        { NavHeader('scripting') }
        <section className="h-full flex flex-col gap-5 justify-center items-center lg:grid lg:grid-cols-2 lg:place-items-center">
            { Board('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR', 'w', '84', '43', ['75', '66', '57', '48'], '14') }
            <ScriptEditor></ScriptEditor>
        </section>
    </div>
}

export default ScriptingPage;