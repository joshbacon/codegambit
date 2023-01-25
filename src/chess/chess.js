
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
    
    if (!FEN) {
        loadFEN(INITIAL_FEN);
    } else {
        let {valid, code, error} = validateFEN(FEN);
        console.log(valid);
        if (valid) {
            loadFEN(FEN);
        } else {
            console.log("FEN error #"+code+": " + error + " Starting with default board.");
            loadFEN(INITIAL_FEN);
        }
    }
    console.log(board);
    // console.log(INITIAL_FEN);
    // console.log(generateFEN());

    for (let p in board) {
        document.getElementById(p).classList.add(getPiece(p));
    }


    /* FEN Functions */
    function loadFEN(FEN) {
        
        try {
            let tokens = FEN.split(' ');
        
            board = {};
            turn = tokens[1];
            castling = tokens[2];
            enpassant = tokens[3];
            halfmove = Number(tokens[4]);
            fullmove = Number(tokens[5]);

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
        if (!/^[A-H][1-8]$/.test(from) || !/^[A-H][1-8]$/.test(to)) {
            return false;
        }
        if (isValidMove(from, to)) {
            let move = generateMoveNotation(from, to);
            let piece = getPiece(from);
            movePiece(from, to);
            moveHistory.push(move);
            // update enpassant if necessary
            // reset halfmove counter if a pawn is pushed or a piece is captured
            if (piece === PIECES.PAWN_W || piece === PIECES.PAWN_B || move.includes('x')) {
                halfmove = 0;
            } else halfmove += 1;
            if (turn === BLACK){
                fullmove += 1;
                turn = WHITE;
            } else {
                turn = BLACK;
            }
            // update castling rights if necessary
            if (castling) {
                if (piece === PIECES.KING_W) {
                    castling = castling.replace('K', '');
                    castling = castling.replace('Q', '');
                }
                else if (piece === PIECES.KING_B) {
                    castling = castling.replace('k', '');
                    castling = castling.replace('q', '');
                } else if (piece === PIECES.ROOK_W) {
                    if (from === 'A1') castling = castling.replace('Q', '');
                    if (from === 'H1') castling = castling.replace('K', '');
                } else if (piece === PIECES.ROOK_B) {
                    if (from === 'A8') castling = castling.replace('q', '');
                    if (from === 'H8') castling = castling.replace('k', '');
                }
                if (!castling) castling = '-';
            }
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
        return board[square] ? board[square] : '';
    }

    function placePiece(piece, square) {
        document.getElementById(square).classList.add(piece);

        board[square] = piece;
    }

    function removePiece(square) {
        document.getElementById(square).classList.remove(getPiece(square));

        delete board[square];
    }

    function validMoves(square) {
        let moves = [];
        let possibles = pieceMoves(square);
        for (let m in possibles) {
            if (isValidMove(m)) moves.push(m);
        }
        return moves;
    }

    /* State Checking Functions */
    function isValidMove(from, to) {
        // Return false if there is no piece to move
        if (getPiece(from) === '') return false;
        
        // Return false if trying to move other players piece
        if (turn === WHITE && getPiece(from) !== getPiece(from).toUpperCase()) return false;
        if (turn === BLACK && getPiece(from) !== getPiece(from).toLowerCase()) return false;

        // check if it is a valid movement for the selected piece
        if (!pieceMoves(from).includes(to)) return false;
        
        // Can't ignore check and can't put yourself in check (or mate)
        if (wouldBeCheck(from, to)) return false;
        if (wouldBeMate(from, to)) return false;

        // Don't move a piece ontop of another of your pieces
        if (getPiece(to)) {
            if (turn === WHITE && getPiece(to) === getPiece(to).toUpperCase()) return false;
            if (turn === BLACK && getPiece(to) === getPiece(to).toLowerCase()) return false;    
        }

        // Otherwise, return true
        return true;
    }

    function pieceMoves(square) {
        let moves = [];
        switch (getPiece(square)) {
            case PIECES.PAWN_B:
                if (square in DOWN) {
                    moves.push(DOWN[square]);
                    if (square.charAt(1) === '7' && moves[0] in DOWN) {
                        moves.push(DOWN[moves[0]]);
                    }
                }
                break;
            case PIECES.PAWN_W:
                if (square in UP) {
                    moves.push(UP[square]);
                    if (square.charAt(1) === '2' && moves[0] in UP) {
                        moves.push(UP[moves[0]]);
                    }
                }
                break;
            case PIECES.ROOK_B:
            case PIECES.ROOK_W:
                moves = getStraightMoves(square);
                break;
            case PIECES.BISHOP_B:
            case PIECES.BISHOP_W:
                moves = getDiagonalMoves(square);
                break;
            case PIECES.KNIGHT_B:
            case PIECES.KNIGHT_W:
                moves = callBobSeger(square);
                break;
            case PIECES.QUEEN_B:
            case PIECES.QUEEN_W:
                moves = getDiagonalMoves(square).concat(getStraightMoves(square));
                break;
            case PIECES.KING_B:
            case PIECES.KING_W:
                if (square in UP) moves.push(UP[square]);
                if (square in DOWN) moves.push(DOWN[square]);
                if (square in LEFT) moves.push(LEFT[square]);
                if (square in RIGHT) moves.push(RIGHT[square]);
                if (square in UPLEFT) moves.push(UPLEFT[square]);
                if (square in UPRIGHT) moves.push(UPRIGHT[square]);
                if (square in DOWNLEFT) moves.push(DOWNLEFT[square]);
                if (square in DOWNRIGHT) moves.push(DOWNRIGHT[square]);
                break;
        }
        return moves;
    }

    function getDiagonalMoves(from) {
        let moves = [];
        let next = from;
        // add moves up and left
        if (from in UPLEFT) {
            do {
                if (getPiece(UPLEFT[next])) {
                    if (turn === WHITE && getPiece(UPLEFT[next]) !== getPiece(UPLEFT[next]).toUpperCase() ||
                        turn === BLACK && getPiece(UPLEFT[next]) !== getPiece(UPLEFT[next]).toLowerCase() ){
                        moves.push(UPLEFT[next]);
                    }
                    break;
                }
                next = UPLEFT[next];
                moves.push(next);
            } while (next in UPLEFT);
        }
        // add moves up and right
        if (from in UPRIGHT) {
            next = from;
            do {
                if (getPiece(UPRIGHT[next])) {
                    if (turn === WHITE && getPiece(UPRIGHT[next]) !== getPiece(UPRIGHT[next]).toUpperCase() ||
                        turn === BLACK && getPiece(UPRIGHT[next]) !== getPiece(UPRIGHT[next]).toLowerCase() ){
                        moves.push(UPRIGHT[next]);
                    }
                    break;
                }
                next = UPRIGHT[next];
                moves.push(next);
            } while (next in UPRIGHT);
        }
        // add moves down and left
        if (from in DOWNLEFT) {
            next = from;
            do {
                if (getPiece(DOWNLEFT[next])) {
                    if (turn === WHITE && getPiece(DOWNLEFT[next]) !== getPiece(DOWNLEFT[next]).toUpperCase() ||
                        turn === BLACK && getPiece(DOWNLEFT[next]) !== getPiece(DOWNLEFT[next]).toLowerCase() ){
                        moves.push(DOWNLEFT[next]);
                    }
                    break;
                }
                next = DOWNLEFT[next];
                moves.push(next);
            } while (next in DOWNLEFT);
        }
        // add moves down and right
        if (from in DOWNRIGHT) {
            next = from;
            do {
                if (getPiece(DOWNRIGHT[next])) {
                    if (turn === WHITE && getPiece(DOWNRIGHT[next]) !== getPiece(DOWNRIGHT[next]).toUpperCase() ||
                        turn === BLACK && getPiece(DOWNRIGHT[next]) !== getPiece(DOWNRIGHT[next]).toLowerCase() ){
                        moves.push(DOWNRIGHT[next]);
                    }
                    break;
                }
                next = DOWNRIGHT[next];
                moves.push(next);
            } while (next in DOWNRIGHT);
        }
        return moves;
    }

    function getStraightMoves(from) {
        let moves = [];
        let next = from;
        // add moves above
        if (from in UP) {
            do {
                if (getPiece(UP[next])) {
                    if (turn === WHITE && getPiece(UP[next]) !== getPiece(UP[next]).toUpperCase() ||
                        turn === BLACK && getPiece(UP[next]) !== getPiece(UP[next]).toLowerCase() ){
                        moves.push(UP[next]);
                    }
                    break;
                }
                next = UP[next];
                moves.push(next);
            } while (next in UP);
        }
        // add moves below
        if (from in DOWN) {
            next = from;
            do {
                if (getPiece(DOWN[next])) {
                    if (turn === WHITE && getPiece(DOWN[next]) !== getPiece(DOWN[next]).toUpperCase() ||
                        turn === BLACK && getPiece(DOWN[next]) !== getPiece(DOWN[next]).toLowerCase() ){
                        moves.push(DOWN[next]);
                    }
                    break;
                }
                next = DOWN[next];
                moves.push(next);
            } while (next in DOWN);
        }
        // add moves to left
        if (from in LEFT) {
            next = from;
            do {
                if (getPiece(LEFT[next])) {
                    if (turn === WHITE && getPiece(LEFT[next]) !== getPiece(LEFT[next]).toUpperCase() ||
                        turn === BLACK && getPiece(LEFT[next]) !== getPiece(LEFT[next]).toLowerCase() ){
                        moves.push(LEFT[next]);
                    }
                    break;
                }
                next = LEFT[next];
                moves.push(next);
            } while (next in LEFT);
        }
        // add moves to right
        if (from in RIGHT) {
            next = from;
            do {
                if (getPiece(RIGHT[next])) {
                    if (turn === WHITE && getPiece(RIGHT[next]) !== getPiece(RIGHT[next]).toUpperCase() ||
                        turn === BLACK && getPiece(RIGHT[next]) !== getPiece(RIGHT[next]).toLowerCase() ){
                        moves.push(RIGHT[next]);
                    }
                    break;
                }
                next = RIGHT[next];
                moves.push(next);
            } while (next in RIGHT);
        }
        return moves;
    }

    // getKnightMoves
    function callBobSeger(from) {
        let moves = [];
        let temp;
        if (from in UPLEFT) {
            temp = UPLEFT[from];
            if (UP[UPLEFT[from]]) moves.push(UP[UPLEFT[from]]);
            if (LEFT[UPLEFT[from]]) moves.push(LEFT[UPLEFT[from]]);
        }
        if (from in UPRIGHT) {
            temp = UPRIGHT[from];
            if (UP[temp]) moves.push(UP[temp]);
            if (RIGHT[temp]) moves.push(RIGHT[temp]);
        }
        if (from in DOWNLEFT) {
            temp = DOWNLEFT[from];
            if (DOWN[temp]) moves.push(DOWN[temp]);
            if (LEFT[temp]) moves.push(LEFT[temp]);
        }
        if (from in DOWNRIGHT) {
            temp = DOWNRIGHT[from];
            if (DOWN[temp]) moves.push(DOWN[temp]);
            if (RIGHT[temp]) moves.push(RIGHT[temp]);
        }
        return moves;
    }

    // current check
    function inCheck() {
        let pieces = getPieces(turn);
        let taget = turn === WHITE ? PIECES.KING_W : PIECES.KING_B;
        return false;
    }

    // check one move ahead
    function wouldBeCheck(from, to) {
        return false;
    }

    // current mate
    function inMate() {
        return false;
    }

    // mate one move ahead
    function wouldBeMate(from, to) {
        return false;
    }

    function inStalemate() {
        let pieces = getPieces(turn);
        if (turn === WHITE) {
            // must have only king left
            if (len(pieces) > 1) return false;
            // and he can't have any valid moves
            if (len(validMoves(Object.keys(pieces)[0])) > 0) return false;
        }
        // Must be blacks turn if not whites
        // must have only king left
        if (len(pieces) > 1) return false;
        // and he can't have any valid moves
        if (len(validMoves(Object.keys(pieces)[0])) > 0) return false;
        return true;
    }

    function inDraw() {
        if (deadPosition() ||
            insufficientMaterial() ||
            moveRepetition() ||
            halfmove >= 100
        ) return true;
        return false;
    }

    function deadPosition() {
        // true if no progress can be made
        // ex. '8/1k6/3p4/p1pPp2p/P1P1P1pP/6P1/5K2/8 w KQkq - 0 1'
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
        if (w_pieces.includes(PIECES.QUEEN_W) ||
            w_pieces.includes(PIECES.ROOK_W) ||
            w_pieces.includes(PIECES.PAWN_W) ) return false;
        if (b_pieces.includes(PIECES.QUEEN_B) ||
            b_pieces.includes(PIECES.ROOK_B) ||
            b_pieces.includes(PIECES.PAWN_B) ) return false;

        // classify white and black as 1, 2, 3, or 4
        // check for 1 (must have a king so if length is 1, it's a king)
        if (w_pieces.length === 1) white = 1;
        if (b_pieces.length === 1) black = 1;
        // check for 2 & 3
        if (w_pieces.length === 2) {
            if (w_pieces.includes(PIECES.BISHOP_W)) white = 2;
            if (w_pieces.includes(PIECES.KNIGHT_W)) white = 3;
        }
        if (b_pieces.length === 2) {
            if (b_pieces.includes(PIECES.BISHOP_B)) black = 2;
            if (b_pieces.includes(PIECES.KNIGHT_B)) black = 3;
        }
        // check for 4 (we already know length must be 3)
        // want two knights and already kicked out if it has a queen or rook,
        // so if it doesn't have a bishop it must be two knights
        if (w_pieces.length === 3 && !w_pieces.includes(PIECES.BISHOP_W)) white = 4;
        if (b_pieces.length === 3 && !b_pieces.includes(PIECES.BISHOP_B)) black = 4;

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
        // true when the same position is reached at least 3 times
        // (i.e. generating FEN at each point would return the eact same thing)

        // need at least 8 moves to repeat same position 3 times
        if (len(moveHistory) > 7) {
            return true;
        }
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
    }
}

let game = Chess();

console.log(game.makeMove('A2', 'A4'));
console.log(game.makeMove('A7', 'A5'));
console.log(game.makeMove('H2', 'H3'));
console.log(game.makeMove('H7', 'H6'));
console.log(game.makeMove('A1', 'A3'));
console.log(game.makeMove('A8', 'A6'));
console.log(game.makeMove('H1', 'H2'));
console.log(game.makeMove('H8', 'H7'));
console.log(game.generateFEN());


// wayward queen attack
// console.log(game.makeMove('E2', 'E4'));
// console.log(game.makeMove('E7', 'E5'));
// console.log(game.makeMove('D1', 'H5'));
// console.log(game.makeMove('B8', 'C6'));
// console.log(game.makeMove('F1', 'C4'));
// console.log(game.makeMove('D7', 'D6'));
// console.log(game.makeMove('H5', 'F7'));
// console.log(game.generateFEN());