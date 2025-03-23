const initialState = {

    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    
    // Values required for game logic
    started: false,
    aiDepth: 2,
    
    // Values required by board
    playingAs: 'w',
    selected: '',
    previousMove: '',
    validMoves: [],
    mateSquare: '',
};