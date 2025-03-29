import Board from "../components/board";
import NavHeader from "../components/header";
import PuzzleSelector from "../components/puzzleselector";

function PuzzlesPage() {

    return <div className="flex flex-col gap-5 w-screen h-screen justify-around items-center">
        { NavHeader('puzzles') }
        <section className="h-full w-full flex flex-col gap-5 justify-center items-center lg:grid lg:grid-cols-2 lg:place-items-center">
            <Board />
            <PuzzleSelector />
        </section>
    </div>
}

export default PuzzlesPage;