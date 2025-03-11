import Board from "../components/board";
import NavHeader from "../components/header";
import Terminal from "../components/terminal";

function SinglePlayer() {

    return <div className="flex flex-col gap-5 w-screen h-screen justify-around items-center">
        { NavHeader('singleplayer') }
        <section className="h-full grid grid-cols-2 place-items-center">
            <Board></Board>
            <Terminal></Terminal>
        </section>
    </div>
}

export default SinglePlayer;