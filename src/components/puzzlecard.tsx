import Puzzle from "../models/puzzle";
import duckIcon from '../assets/icons/duck.svg';

function PuzzleCard(puzzle: Puzzle, callBack: Function) {

    let difficultyCounter: string[] = [];
    for (let d: number = 0; d < puzzle.difficulty; d++) {
        difficultyCounter.push(duckIcon);
    }

    return <div
        key={puzzle.pid}
        className="flex flex-wrap w-full max-w-full place-items-center p-3 rounded-2xl bg-neutral-900 cursor-pointer"
        onClick={() => {callBack(puzzle.pid)}}
    >
        <h3>{puzzle.name}</h3>
        <div className="flex ml-auto">
            { difficultyCounter.map((_, key) => {
                return <img key={key} src={duckIcon} className="w-12 aspect-square" />;
            })}
        </div>
        
    </div>;
}

export default PuzzleCard;