import { useState } from "react";
import Puzzle from "../models/puzzle";
import PuzzleCard from "./puzzlecard";
import randomIcon from '../assets/icons/random.svg';
import Terminal from "./terminal";

function PuzzleSelector() {

    const [selectedSection, setSelectedSection] = useState<number>(0);

    const [inPuzzle, setInPuzzle] = useState<number>(-1);

    let puzzleList: Puzzle[] = [
        {
            pid: 1,
            name: 'test1',
            difficulty: 1,
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            playingAs: 'w',
            moves: [],
        },
        {
            pid: 2,
            name: 'test2',
            difficulty: 2,
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            playingAs: 'w',
            moves: [],
        },
        {
            pid: 3,
            name: 'test3',
            difficulty: 3,
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            playingAs: 'w',
            moves: [],
        },
        {
            pid: 4,
            name: 'test4',
            difficulty: 4,
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            playingAs: 'w',
            moves: [],
        },
        {
            pid: 5,
            name: 'test5 asdfawsfavwef',
            difficulty: 5,
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            playingAs: 'w',
            moves: [],
        }
    ];

    return <div className="relative flex flex-col place-items-center gap-5 overflow-hidden w-4/5 min-w-[355px] p-4 rounded-2xl bg-neutral-800 text-green-700 transition-all duration-1000">

        <button
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => {}}
        >
            <img src={randomIcon} className="w-10 aspect-square" />
        </button>

        <h1 className="text-3xl font-bold">
            Puzzles
        </h1>

        <div className="w-full grid grid-cols-1 grid-rows-1">
            <section className={`relative col-start-1 row-start-1 flex flex-col gap-1 w-full transition-opacity duration-1000 ${inPuzzle >= 0 ? 'opacity-0' : 'z-20'}`}>
                <div className="flex flex-col w-full justify-evenly sm:grid sm:grid-cols-3 rounded-2xl mb-3 outline-2 outline-neutral-900 overflow-hidden">
                    <button
                        className={`w-full h-full cursor-pointer ${selectedSection === 0 ? 'bg-neutral-900' : ''}`}
                        onClick={() => {setSelectedSection(0)}}
                    >
                        <h2 className="text-lg font-bold">Daily</h2>
                    </button>
                    <button
                        className={`w-full h-full cursor-pointer ${selectedSection === 1 ? 'bg-neutral-900' : ''}`}
                        onClick={() => {setSelectedSection(1)}}
                    >
                        <h2 className="text-lg font-bold">Suggested</h2>
                    </button>
                    <button
                        className={`w-full h-full cursor-pointer ${selectedSection === 2 ? 'bg-neutral-900' : ''}`}
                        onClick={() => {setSelectedSection(2)}}
                    >
                        <h2 className="text-lg font-bold">Completed</h2>
                    </button>
                </div>

                <div className="flex flex-col gap-1 h-[500px] overflow-y-scroll">
                    { puzzleList.map((puzzle) => {
                        return PuzzleCard(puzzle, setInPuzzle);
                    }) }
                </div>
            </section>

            <section className={`col-start-1 row-start-1 w-full pb-3 transition-opacity duration-1000 ${inPuzzle < 0 ? 'opacity-0' : 'z-20'}`}>
                <div className="w-full rounded-2xl outline-2 outline-neutral-900 overflow-hidden">
                    <button
                        className='w-full h-full cursor-pointer hover:bg-neutral-900 '
                        onClick={() => {setInPuzzle(-1)}}
                    >
                        <h2 className="text-lg font-bold">Back</h2>
                    </button>
                </div>
                <div className="w-full h-full grid place-items-center">
                    <div className="flex flex-col gap-3 justify-center place-items-center">
                        <h1 className="text-xl font-semibold">Puzzle name</h1>
                        <p>Puzzle description</p>
                    </div>
                    <Terminal />
                </div>
            </section>
        </div>

    </div>
}

export default PuzzleSelector;