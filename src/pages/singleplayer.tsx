import Board from "../components/board";
import NavHeader from "../components/header";
import Terminal from "../components/terminal";

function SinglePlayerPage() {

    return <div className="flex flex-col gap-5 w-screen h-screen justify-around items-center">
        { NavHeader('singleplayer') }
        <section className="h-full w-full flex flex-col gap-5 justify-center items-center lg:grid lg:grid-cols-2 lg:place-items-center">
            <Board />
            <Terminal />
        </section>
    </div>
}

export default SinglePlayerPage;