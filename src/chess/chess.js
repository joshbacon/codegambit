
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

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
// FEN Explanation:
// first field  : pieces (left to right, top to bottom, from whites perspective)
// second field : whos turn it is
// third field  : castling right (K means white can castle king side, Q means white can queen side and same for black with lowercase)
// fourth field : enpassant eligiblility (if e pawn moves two spaces of jump it would be e3, so where taking piece would land)
// fifth field  : 'halfmove clock' enforces 50 move rule, counts moves without capture or pawn push (draw if == 100)
// sixth field  : 'fullmove number', number of moves played this game (increments each time black makes a move)







//export
const Chess = function(FEN) {

    /* Setup */
    let board = [];
    let moveHistory = [];

    let turn,
        castling,
        enpassant,
        halfmove,
        fullmove;
    
    let { valid, code, error} = validateFEN(FEN);
    if (valid) {
        loadFEN(FEN);
    } else {
        console.log("FEN error #"+code+": " + error + " Starting with default board.");
        loadFEN(INITIAL_FEN);
    }
    console.log(board);
    console.log(INITIAL_FEN);
    console.log(generateFEN());


    /* FEN Functions */
    function loadFEN(FEN) {
        
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

    function generateFEN() {
        let FEN = '';
        // add slash separated pieces
        let rowCounter = 0;
        let spaceCounter = 0;
        for (i in board) {
            if (rowCounter === 8) {
                if (spaceCounter !== 0) {
                    FEN += spaceCounter;
                    spaceCounter = 0;
                }
                FEN += '/';
                rowCounter = 0;
            }

            if (board[i] === '') {
                spaceCounter += 1;
            } else {
                if (spaceCounter !== 0) {
                    FEN += spaceCounter;
                    spaceCounter = 0;
                }
                FEN += board[i];
            }

            rowCounter += 1;
        }
        // add turn
        FEN += " "+turn;
        // add castling
        FEN += " "+castling;
        // add enpassant
        FEN += " "+enpassant;
        // add halfmove
        FEN += " "+halfmove;
        // add fullmove
        FEN += " "+fullmove;
        return FEN;
    }

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
        if (isNaN(fullmove) || parseInt(fullmove) <= 0)
            return {valid: false, code: 10, error: "Fullmove field must be an integer greater than 0"};
    
        return {valid: true, code: 0, error:"No error."};
    }

    /* Move Functions */
    function makeMove(from, to) {
        if (isValidMove(from, to)){
            movePiece(from, to);
            // need to add the move to the move history
            // update castling rights if necessary
            // update enpassant if necessary
            halfmove += 1
            let piece = getPiece(to);
            if (piece.toUpperCase() === piece){
                fullmove += 1;
                turn = WHITE;
            } else turn = BLACK;
        }
    }

    function movePiece(from, to) {
        placePiece(getPiece(from), to);
        removePiece(from);
    }

    function getPiece(square) {
        let cr = square.split('');
        let pieceIndex = COLUMNS[cr[0]]*8 + ROWS[cr[1]];
        return board[pieceIndex];
    }

    function placePiece(piece, square) {
        let cr = square.split('');
        let pieceIndex = COLUMNS[cr[0]]*8 + ROWS[cr[1]];
        board[pieceIndex] = piece;
    }

    function removePiece(square) {
        let cr = square.split('');
        let pieceIndex = COLUMNS[cr[0]]*8 + ROWS[cr[1]];
        board[pieceIndex] = '';
    }

    /* State Checking Functions */
    function isValidMove() {
        /*
            - square notations are formatted properly (we grab the piece so it has to be)
            - given piece color needs to be that of the current players turn
            - can't put or leave player in mate (i.e. can't be in mate after the fact)
            - must be to a valid square gven the piece and its current position
        */
        return false;
    }

    function inCheck() {

    }

    function inMate() {

    }

    function inStalemate() {

    }

    function inDraw() {

    }

    function insufficientMaterial() {

    }

    function moveRepetition() {

    }


    /* Return functions for use in the terminal */
    return {
        loadFEN: function(FEN) {
            return loadFEN(FEN);
        },

        generateFEN: function() {
            return generateFEN();
        },

        validateFEN: function(FEN) {
            validateFEN(FEN);
        },

        makeMove: function(from, to) {
            return makeMove(from, to);
        },

        movePiece: function(from, to) {
            return movePiece(from, to);
        },

        getPiece: function(square) {
            return getPiece(square);
        },

        placePiece: function(piece, square) {
            return placePiece(piece, square);
        },

        removePiece: function(square) {
            return removePiece(square);
        },

        isValidMove: function() {

        },

        inCheck: function() {

        },
        
        inMate: function() {

        },
        
        inStalemate: function() {

        },
        
        inDraw: function() {

        },
        
        insufficientMaterial: function() {

        },
        
        moveRepetition: function() {

        },

        /* Getter methods for variables */
        getBoard: function() { return board; },
        getMoveHistory: function() { return moveHistory; },
        getTurn: function() { return turn; },
        getCastling: function() { return castling; },
        enpassant: function() { return enpassant; },
        halfmove: function() { return halfmove; },
        fullmove: function() { return fullmove; }
    }
}

Chess(INITIAL_FEN);