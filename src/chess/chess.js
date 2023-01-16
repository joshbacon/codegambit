
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
// Notes:
// - piece is always uppercase
// - file(column) is always lowercase



// Constants
import {
    COLUMNS,
    ROWS,
    WHITE,
    BLACK, 
    PIECES,
    INITIAL_FEN,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    UPLEFT,
    UPRIGHT,
    DOWNLEFT,
    DOWNRIGHT
} from './constants.js';

// export
const Chess = function(FEN) {

    /* Setup */
    let board = {};
    let moveHistory = [];

    let moveRepeats = 0;

    let turn,
        castling,
        enpassant,
        halfmove,
        fullmove;
    
    let {valid, code, error} = validateFEN(FEN);
    if (valid) {
        loadFEN(FEN);
    } else {
        console.log("FEN error #"+code+": " + error + " Starting with default board.");
        loadFEN(INITIAL_FEN);
    }
    // console.log(board);
    // console.log(INITIAL_FEN);
    // console.log(generateFEN());


    /* FEN Functions */
    function loadFEN(FEN) {
        
        try {
            let tokens = FEN.split(' ');
        
            board = {};
            turn = tokens[1];
            castling = tokens[2];
            enpassant = tokens[3];
            halfmove = tokens[4];
            fullmove = tokens[5];

            let pieces = tokens[0].split('/');
            for (let r = 0; r < pieces.length; r++) {
                let col = 65;
                for (let c = 0; c < pieces[r].length; c++){
                    let piece = pieces[r][c];
                    if (isNaN(piece)){
                        board[String.fromCharCode(col)+(8-r)] = piece;
                        col++;
                    }
                    else col += Number(piece);
                }
            }
            // console.log(board);
            return true;
        } catch (error) {
            return false;
        }

    }

    function generateFEN() {
        let FEN = '';
        // add slash separated pieces
        let sortedKeys = [];
        for (let key in board) sortedKeys[sortedKeys.length] = key;
        sortedKeys.sort();
        for (let i = 8; i > 0; i--){
            let row = [];
            for (let k in sortedKeys)
                if (sortedKeys[k].includes(i.toString()))
                    row.push(sortedKeys[k]);
            if (row.length > 0) console.log(`i == ${i} [${row}]`);

            let spaces = 0;
            if (row.length === 0) FEN += '8'
            else for (let lastPos = 65; lastPos < 73; lastPos++) {
                if (row.includes(String.fromCharCode(lastPos)+i)) {
                    if (spaces > 0) {
                        FEN += spaces;
                        spaces = 0;
                    }
                    FEN += board[String.fromCharCode(lastPos)+i];
                }
                else spaces++;
            }
            if (spaces > 0) FEN += spaces;
            FEN += '/';
        }
        FEN = FEN.substring(0, FEN.length -1);
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
    
        for (let r in pieces) {
            let rowSum = 0;
            let lastWasNumber = false;
            for (let p in pieces[r]) {
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
        if (isValidMove(from, to)) {
            let move = generateMoveNotation(from, to);
            moveHistory.push(move);
            console.log(moveHistory);
            movePiece(from, to);
            // update castling rights if necessary
            // update enpassant if necessary
            halfmove += 1
            let piece = getPiece(to);
            if (piece.toUpperCase() === piece){
                fullmove += 1;
                turn = WHITE;
            } else turn = BLACK;
            return move;
        } else return false;
    }

    function generateMoveNotation(from, to) {
        // need to update this to account for castling
        let move = '';
        let piece = getPiece(from);
        if (piece !== PIECES.PAWN_W && piece !== PIECES.PAWN_B)
            move += piece.toUpperCase();
        if (false)
            // if more than one (of the same piece) can legally make this move, insert the column it is moving from here
            move += from.charAt(0);
        if (getPiece(to) !== '')
            move += 'x'
        move += to.toLowerCase();
        if (inMate())
            move += '#'
        else if (inCheck())
            move += '+'
        // if its a pawn that is promoting put '=PIECE' like '=Q' for a queen at the very end (always uppercase)
        return move;
    }

    function movePiece(from, to) {
        placePiece(getPiece(from), to);
        removePiece(from);
    }

    function getPiece(square) {
        return board[square];
    }

    function placePiece(piece, square) {
        document.getElementById(square).classList.add(piece);

        board[square] = piece;
    }

    function removePiece(square) {
        document.getElementById(square).classList.remove(getPiece(square));

        delete board[square];
    }

    /* State Checking Functions */
    function isValidMove() {
        /*
            - square notations are formatted properly (we grab the piece so it has to be)
            - given piece color needs to be that of the current players turn
            - can't put or leave player in mate (i.e. can't be in mate after the fact)
            - must be to a valid square gven the piece and its current position
        */
        return true;
    }

    function inCheck() {
        return false;
    }

    function inMate() {
        return false;
    }

    function inStalemate() {
        return false;
    }

    function inDraw() {
        return false;
    }

    function insufficientMaterial() {
        let w_pieces = Object.values(getPieces(WHITE));
        let b_pieces = Object.values(getPieces(BLACK));

        let white = 0, black = 0;

        // If BOTH SIDES have any one of the following, and there are NO PAWNS on the board
        // - (1) a lone king
        // - (2) a king and a bishop
        // - (3) a king and a knight
        //
        // - (4) a king and two nights (iff the other side has a lone king)

        // kick out early if possible
        // both sides must have 3 or less pieces for this to be true
        if (w_pieces.length > 3 || b_pieces.length > 3) return false;
        // never true if a queen or rook is on the board
        if (w_pieces.includes('Q') ||
            w_pieces.includes('R') ||
            w_pieces.includes('P') ) return false;
        if (b_pieces.includes('q') ||
            b_pieces.includes('r') ||
            b_pieces.includes('p') ) return false;

        // classify white and black as 1, 2, 3, or 4
        // check for 1 (must have a king so if length is 1, it's a king)
        if (w_pieces.length === 1) white = 1;
        if (b_pieces.length === 1) black = 1;
        // check for 2 & 3
        if (w_pieces.length === 2) {
            if (w_pieces.includes('B')) white = 2;
            if (w_pieces.includes('N')) white = 3;
        }
        if (b_pieces.length === 2) {
            if (b_pieces.includes('b')) black = 2;
            if (b_pieces.includes('n')) black = 3;
        }
        // check for 4 (we already know length must be 3)
        // want two knights and already kicked out if it has a queen or rook,
        // so if it doesn't have a bishop it must be two knights
        if (w_pieces.length === 3 && !w_pieces.includes('B')) white = 4;
        if (b_pieces.length === 3 && !b_pieces.includes('b')) black = 4;

        console.log('white = ' + white);
        console.log('black = ' + black);

        // so return true if
        // white == 1 && black > 0 or vice versa
        // if (white === 1 && black > 0) return true;
        if (white === 1) return true; // already booted out if black isn't > 0... right?
        // if (black === 1 && white > 0) return true;
        if (black === 1) return true; // already booted out if white isn't > 0... right?
        // 0 < white < 4 && 0 < black < 4
        if (0 < white && white < 4 && 0 < black && black < 4) return true;

        return false; // return false just in case
    }

    function moveRepetition() {
        return false;
    }

    function getPieces(color) {
        if (color === WHITE)
            return Object.keys(board)
                .filter( key => board[key] === board[key].toUpperCase() )
                .reduce((list, key) => {
                    list[key] = board[key];
                    return list;
                }, {});
        else
            return Object.keys(board)
                .filter( key => board[key] === board[key].toLowerCase() )
                .reduce((list, key) => {
                    list[key] = board[key];
                    return list;
                }, {});
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
        
        insufficientMaterial: function(color) {
            return insufficientMaterial(color);
        },
        
        moveRepetition: function() {

        },

        /* Getter methods for variables */
        getPieces: function() { return board; },
        getMoveHistory: function() { return moveHistory; },
        getTurn: function() { return turn; },
        getCastling: function() { return castling; },
        enpassant: function() { return enpassant; },
        halfmove: function() { return halfmove; },
        fullmove: function() { return fullmove; },

        clear: function() {
            let c = 65;
            let r = 8;
            for (let p in board) {
                let square = String.fromCharCode(c)+String(r);
                try { document.getElementById(square).classList.remove(getPiece(square)); }
                catch (error) {}
                c += 1;
                if (c === 73) {
                    c = 65;
                    r -= 1;
                }
            }
        },
        load: function() {
            c = 65;
            r = 8;
            for (let p in board) {
                let square = String.fromCharCode(c)+String(r);
                try {
                    document.getElementById(square).classList.add(getPiece(square));                    
                } catch (error) {}
                c += 1;
                if (c === 73) {
                    c = 65;
                    r -= 1;
                }
            }
        }
    }
}

let game = Chess(INITIAL_FEN);