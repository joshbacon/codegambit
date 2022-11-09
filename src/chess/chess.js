
// This file contains all the things needed to play basic chess:
// - pieces
// - rules

// also need:
// - colors
// - initial game setup
// - position movements (up, down, left, right, up_left, down_right, up_right, down_left)




// move examples
// pawn move:       e3   (no piece prefix for pawns)
// knight move:    nf6
// bishop move:    bg4
// rook move:      rb1
// queen move:     Qg4
// king move:      kd1

// if move takes a piece, add an 'x' between piece and new position
//    ex. nxh7
// if move puts opponent in check, add a '+' after the new position
//    ex. bg6+
// if move puts opponent in check-mate, add a '#' after the new position
//    ex. ra8#
// if pawn promotes, add '=q' after the position (but before check/mate if applicable)
//                         └> code for whatever piece it promotes too
//    ex. f8=q
// if two of same piece can move to same position, add 'column of old piece position' after piece but before new position
//    ex. Rae1



// Constants

const COLUMNS = {'A':0, 'B':1, 'C':2, 'D':3, 'E':4, 'F':5, 'G':6, 'H':7};
const ROWS = {'1':7, '2':6, '3':5, '4':4, '5':3, '6':2, '7':1, '8':0};

const WHITE = 'w';
const BLACK = 'b';

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

    EMPTY:    ''
}

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'


function boardFromFEN(FEN){
    let tokens = FEN.split('/');
    let board = [];
    for (r in tokens) {
        for (c in tokens[r]) {
            let piece = tokens[r][c];
            if (isNaN(piece))
                board.push(piece);
            else
                for (i = 0; i < parseInt(piece); i++)
                    board.push('');
        }
    }
    return board;
}


//export
const Chess = function (FEN) {

    let board = [];
    let moveHistory = [];

    let turn = WHITE;
    let castling = {ws:0, wl:0, bs:0, bl:0};

    if (FEN !== '') board = boardFromFEN(FEN);
    else board = boardFromFEN(INITIAL_FEN);

    console.log(board);

    function isValidMove(move) {
        // takes in a single move string and returns true or false depending on if it's valid or not
    }
}

Chess('');