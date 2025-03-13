import Board from "../components/board";
import NavHeader from "../components/header";
import Terminal from "../components/terminal";

function SinglePlayer() {

    return <div className="flex flex-col gap-5 w-screen h-screen justify-around items-center">
        { NavHeader('singleplayer') }
        <section className="h-full grid grid-cols-2 place-items-center">
            { Board('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR', 'w', '84', '43', ['75', '66', '57', '48'], '14') }
            <Terminal></Terminal>
        </section>
    </div>
}

export default SinglePlayer;