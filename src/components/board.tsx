import board from '../assets/images/boards/wboardDark.png';

function Board() {
    return <div className="relative w-[70%] aspect-square">
        <img src={board} className="absolute w-full" />
    </div>
}

export default Board;