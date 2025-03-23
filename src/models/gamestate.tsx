
type GameState = {

    fen: string,
    
    // Values required for game logic
    started: boolean,
    aiDepth: number,
    
    // Values required by board
    playingAs: string,
    selected: string,
    previousMove: string,
    validMoves: string[],
    mateSquare: string,

};

export default GameState;