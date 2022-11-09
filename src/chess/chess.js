
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

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0'
// FEN Explanation:
// first field  : pieces (left to right, top to bottom, from whites perspective)
// second field : whos turn it is
// third field  : castling right (K means white can castle king side, Q means white can queen side and same for black with lowercase)
// fourth field : enpassant eligiblility (if e pawn moves two spaces of jump it would be e3, so where taking piece would land)
// fifth field  : 'halfmove clock' enforces 50 move rule, counts moves without capture or pawn push (draw if == 100)
// sixth field  : 'fullmove number', number of moves played this game (increments each time black makes a move)


function validateFEN(FEN) {
    let tokens = FEN.split(' ');
    
    if (tokens.length !== 6)
        return {valid: false, code: 1, error: "FEN string must contain 6 fields."};

    let pieces = tokens[0].split('/');
    let turn = tokens[1];
    let castling = tokens[2];
    let enpassant = tokens[3];
    let halfmove = tokens[4];
    let fullmove = tokens[5];

    // Field #1 checking
    if (pieces.length !== 8)
        return {valid: false, code: 2, error: "Pieces field must consist of 8 rows."};

    for (r in pieces) {
        let rowSum = 0;
        let lastWasNumber = false;
        for (p in pieces[r]) {
            let piece = pieces[r][p];
            if (isNaN(piece)){
                if (/^[KQRBNPkqrbnp]$/.test(piece)) {
                    rowSum += 1;
                    lastWasNumber = false;
                }
                else return {valid: false, code: 3, error: "Invalid piece found in pieces field."};
            } else {
                if (lastWasNumber)
                    return {valid: false, code: 4, error: "Consecutive numbers found in pieces field."};
                rowSum += parseInt(piece);
                lastWasNumber = true;
            }
        }
        if (rowSum !== 8)
            return {valid: false, code: 5, error: "Each row section must account for 8 squares."};
    }

    // Field #2 checking
    if (turn !== WHITE && turn !== BLACK)
        return {valid: false, code: 6, error: "Turn field must be either w or b for white or black."};

    // Field #3 checking
    if (!/^(KQ?k?q?|Qk?q?|kq?|q)|-$/.test(castling))
        return {valid: false, code: 7, error: "Castle field is invalid."};

    // Field #4 checking
    if (!/^([a-h][1-8])|-$/.test(enpassant))
        return {valid: false, code: 8, error: "enpassant field is invalid."};
    
    // Field #5 checking
    if (isNaN(halfmove) || parseInt(halfmove) < 0 || parseInt(halfmove) > 99)
        return {valid: false, code: 9, error: "Halfmove field must be an integer in the range [0, 100)"};

    // Field #6 checking
    if (isNaN(fullmove) || parseInt(fullmove) < 0)
        return {valid: false, code: 10, error: "Fullmove field must be an integer greater than 0"};

    return {valid: true, code: 0, error:"No error."};
}




//export
const Chess = function (FEN) {

    let board = [];
    let moveHistory = [];

    let turn,
        castling,
        enpassant,
        halfmove,
        fullmove;
    
    let validation = validateFEN(FEN);
    if (validation.valid) {
        gameFromFEN(FEN);
    } else {
        console.log("FEN error #"+validation.code+": " + validation.error + " Starting with default board.");
        gameFromFEN(INITIAL_FEN);
    }
    console.log(board);

    function gameFromFEN(FEN){
        
        let tokens = FEN.split(' ');
        
        turn = tokens[1];
        castling = tokens[2];
        enpassant = tokens[3];
        halfmove = tokens[4];
        fullmove = tokens[5];

        let pieces = tokens[0].split('/');
        for (r in pieces) {
            for (c in pieces[r]) {
                let piece = pieces[r][c];
                if (isNaN(piece))
                    board.push(piece);
                else for (i = 0; i < parseInt(piece); i++)
                    board.push('');
            }
        }

    }

    function isValidMove(move) {
        // takes in a single move string and returns true or false depending on if it's valid or not
    }
}

Chess('');