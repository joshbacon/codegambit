import Move from "./move";

type GameState = {
    fen: string,
    started: boolean,
    aiDepth: number,
    playingAs: string,
    singlePlayer: boolean,
    moveHistory: Move[],
};

export default GameState;