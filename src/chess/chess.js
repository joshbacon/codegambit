
// This file contains all the things needed to play basic chess:
// - pieces
// - colors
// - initial game setup
// - position movements (up, down, left, right, up_left, down_right, up_right, down_left)



// Constants

const PIECES = {
    KING_W:   'K',
    QUEEN_W:  'Q',
    ROOK_W:   'R',
    BISHOP_W: 'B',
    KNIGHT_W: 'N',
    PAWN_W:   'P',
    KING_B:   'k',
    QUEEN_B:  'q',
    ROOK_B:   'r',
    BISHOP_B: 'b',
    KNIGHT_B: 'n',
    PAWN_B:   'p',
}

const PIECE_VALUES = {
    P:  10,   p: -10,
    B:  30,   b: -30,
    N:  30,   n: -30,
    R:  50,   r: -50,
    Q:  90,   q: -90,
    K:  900,  k: -900
}

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'


// Variables


// Functions

function checkMate() {

}

function isValidMove() {

}