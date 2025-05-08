import Board from "../components/board";
import NavHeader from "../components/header";
import Terminal from "../components/terminal";

function SinglePlayerPage() {

    return <div className="flex flex-col w-full min-h-screen justify-between items-center">
        <NavHeader />
        <section className="h-full my-auto w-full flex flex-col gap-5 py-5 justify-center items-center lg:grid lg:grid-cols-2 lg:place-items-center">
            <Board />
            <Terminal />
        </section>
    </div>
}

export default SinglePlayerPage;