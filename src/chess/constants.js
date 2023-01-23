

export const COLUMNS = {'A':0, 'B':1, 'C':2, 'D':3, 'E':4, 'F':5, 'G':6, 'H':7};
export const ROWS = {'1':7, '2':6, '3':5, '4':4, '5':3, '6':2, '7':1, '8':0};

export const WHITE = 'w';
export const BLACK = 'b';

export const PIECES = {
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
};

// FEN Explanation:
// first field  : pieces (left to right, top to bottom, from whites perspective)
// second field : whos turn it is
// third field  : castling right (K means white can castle king side, Q means white can queen side and same for black with lowercase)
// fourth field : enpassant eligiblility (if e pawn moves two spaces of jump it would be e3, so where taking piece would land)
// fifth field  : 'halfmove clock' enforces 50 move rule, counts moves without capture or pawn push (draw if == 100)
// sixth field  : 'fullmove number', number of moves played this game (increments each time black makes a move)
export const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RKBQKBNR w KQkq - 0 1';


export const UP = {
    A1: 'A2', B1: 'B2', C1: 'C2', D1: 'D2', E1: 'E2', F1: 'F2', G1: 'G2', H1: 'H2',
    A2: 'A3', B2: 'B3', C2: 'C3', D2: 'D3', E2: 'E3', F2: 'F3', G2: 'G3', H2: 'H3',
    A3: 'A4', B3: 'B4', C3: 'C4', D3: 'D4', E3: 'E4', F3: 'F4', G3: 'G4', H3: 'H4',
    A4: 'A5', B4: 'B5', C4: 'C5', D4: 'D5', E4: 'E5', F4: 'F5', G4: 'G5', H4: 'H5',
    A5: 'A6', B5: 'B6', C5: 'C6', D5: 'D6', E5: 'E6', F5: 'F6', G5: 'G6', H5: 'H6',
    A6: 'A7', B6: 'B7', C6: 'C7', D6: 'D7', E6: 'E7', F6: 'F7', G6: 'G7', H6: 'H7',
    A7: 'A8', B7: 'B8', C7: 'C8', D7: 'D8', E7: 'E8', F7: 'F8', G7: 'G8', H7: 'H8'
}
export const DOWN = {
    A2: 'A1', B2: 'B1', C2: 'C1', D2: 'D1', E2: 'E1', F2: 'F1', G2: 'G1', H2: 'H1',
    A3: 'A2', B3: 'B2', C3: 'C2', D3: 'D2', E3: 'E2', F3: 'F2', G3: 'G2', H3: 'H2',
    A4: 'A3', B4: 'B3', C4: 'C3', D4: 'D3', E4: 'E3', F4: 'F3', G4: 'G3', H4: 'H3',
    A5: 'A4', B5: 'B4', C5: 'C4', D5: 'D4', E5: 'E4', F5: 'F4', G5: 'G4', H5: 'H4',
    A6: 'A5', B6: 'B5', C6: 'C5', D6: 'D5', E6: 'E5', F6: 'F5', G6: 'G5', H6: 'H5',
    A7: 'A6', B7: 'B6', C7: 'C6', D7: 'D6', E7: 'E6', F7: 'F6', G7: 'G6', H7: 'H6',
    A8: 'A7', B8: 'B7', C8: 'C7', D8: 'D7', E8: 'E7', F8: 'F7', G8: 'G7', H8: 'H7'
}
export const LEFT = {
    B1: 'A1', C1: 'B1', D1: 'C1', E1: 'D1', F1: 'E1', G1: 'F1', H1: 'G1',
    B2: 'A2', C2: 'B2', D2: 'C2', E2: 'D2', F2: 'E2', G2: 'F2', H2: 'G2',
    B3: 'A3', C3: 'B3', D3: 'C3', E3: 'D3', F3: 'E3', G3: 'F3', H3: 'G3',
    B4: 'A4', C4: 'B4', D4: 'C4', E4: 'D4', F4: 'E4', G4: 'F4', H4: 'G4',
    B5: 'A5', C5: 'B5', D5: 'C5', E5: 'D5', F5: 'E5', G5: 'F5', H5: 'G5',
    B6: 'A6', C6: 'B6', D6: 'C6', E6: 'D6', F6: 'E6', G6: 'F6', H6: 'G6',
    B7: 'A7', C7: 'B7', D7: 'C7', E7: 'D7', F7: 'E7', G7: 'F7', H7: 'G7',
    B8: 'A8', C8: 'B8', D8: 'C8', E8: 'D8', F8: 'E8', G8: 'F8', H8: 'G8'
}
export const RIGHT = {
    A1: 'B1', B1: 'C1', C1: 'D1', D1: 'E1', E1: 'F1', F1: 'G1', G1: 'H1',
    A2: 'B2', B2: 'C2', C2: 'D2', D2: 'E2', E2: 'F2', F2: 'G2', G2: 'H2',
    A3: 'B3', B3: 'C3', C3: 'D3', D3: 'E3', E3: 'F3', F3: 'G3', G3: 'H3',
    A4: 'B4', B4: 'C4', C4: 'D4', D4: 'E4', E4: 'F4', F4: 'G4', G4: 'H4',
    A5: 'B5', B5: 'C5', C5: 'D5', D5: 'E5', E5: 'F5', F5: 'G5', G5: 'H5',
    A6: 'B6', B6: 'C6', C6: 'D6', D6: 'E6', E6: 'F6', F6: 'G6', G6: 'H6',
    A7: 'B7', B7: 'C7', C7: 'D7', D7: 'E7', E7: 'F7', F7: 'G7', G7: 'H7',
    A8: 'B8', B8: 'C8', C8: 'D8', D8: 'E8', E8: 'F8', F8: 'G8', G8: 'H8'
}

export const UPLEFT = {
    B1: 'A2', C1: 'B2', D1: 'C2', E1: 'D2', F1: 'E2', G1: 'F2', H1: 'G2',
    B2: 'A3', C2: 'B3', D2: 'C3', E2: 'D3', F2: 'E3', G2: 'F3', H2: 'G3',
    B3: 'A4', C3: 'B4', D3: 'C4', E3: 'D4', F3: 'E4', G3: 'F4', H3: 'G4',
    B4: 'A5', C4: 'B5', D4: 'C5', E4: 'D5', F4: 'E5', G4: 'F5', H4: 'G5',
    B5: 'A6', C5: 'B6', D5: 'C6', E5: 'D6', F5: 'E6', G5: 'F6', H5: 'G6',
    B6: 'A7', C6: 'B7', D6: 'C7', E6: 'D7', F6: 'E7', G6: 'F7', H6: 'G7',
    B7: 'A8', C7: 'B8', D7: 'C8', E7: 'D8', F7: 'E8', G7: 'F8', H7: 'G8'
}
export const UPRIGHT = {
    A1: 'B2', B1: 'C2', C1: 'D2', D1: 'E2', E1: 'F2', F1: 'G2', G1: 'H2',
    A2: 'B3', B2: 'C3', C2: 'D3', D2: 'E3', E2: 'F3', F2: 'G3', G2: 'H3',
    A3: 'B4', B3: 'C4', C3: 'D4', D3: 'E4', E3: 'F4', F3: 'G4', G3: 'H4',
    A4: 'B5', B4: 'C5', C4: 'D5', D4: 'E5', E4: 'F5', F4: 'G5', G4: 'H5',
    A5: 'B6', B5: 'C6', C5: 'D6', D5: 'E6', E5: 'F6', F5: 'G6', G5: 'H6',
    A6: 'B7', B6: 'C7', C6: 'D7', D6: 'E7', E6: 'F7', F6: 'G7', G6: 'H7',
    A7: 'B8', B7: 'C8', C7: 'D8', D7: 'E8', E7: 'F8', F7: 'G8', G7: 'H8'
}
export const DOWNLEFT = {
    B2: 'A1', C2: 'B1', D2: 'C1', E2: 'D1', F2: 'E1', G2: 'F1', H2: 'G1',
    B3: 'A2', C3: 'B2', D3: 'C2', E3: 'D2', F3: 'E2', G3: 'F2', H3: 'G2',
    B4: 'A3', C4: 'B3', D4: 'C3', E4: 'D3', F4: 'E3', G4: 'F3', H4: 'G3',
    B5: 'A4', C5: 'B4', D5: 'C4', E5: 'D4', F5: 'E4', G5: 'F4', H5: 'G4',
    B6: 'A5', C6: 'B5', D6: 'C5', E6: 'D5', F6: 'E5', G6: 'F5', H6: 'G5',
    B7: 'A6', C7: 'B6', D7: 'C6', E7: 'D6', F7: 'E6', G7: 'F6', H7: 'G6',
    B8: 'A7', C8: 'B7', D8: 'C7', E8: 'D7', F8: 'E7', G8: 'F7', H8: 'G7'
}
export const DOWNRIGHT = {
    A2: 'B1', B2: 'C1', C2: 'D1', D2: 'E1', E2: 'F1', F2: 'G1', G2: 'H1',
    A3: 'B2', B3: 'C2', C3: 'D2', D3: 'E2', E3: 'F2', F3: 'G2', G3: 'H2',
    A4: 'B3', B4: 'C3', C4: 'D3', D4: 'E3', E4: 'F3', F4: 'G3', G4: 'H3',
    A5: 'B4', B5: 'C4', C5: 'D4', D5: 'E4', E5: 'F4', F5: 'G4', G5: 'H4',
    A6: 'B5', B6: 'C5', C6: 'D5', D6: 'E5', E6: 'F5', F6: 'G5', G6: 'H5',
    A7: 'B6', B7: 'C6', C7: 'D6', D7: 'E6', E7: 'F6', F7: 'G6', G7: 'H6',
    A8: 'B7', B8: 'C7', C8: 'D7', D8: 'E7', E8: 'F7', F8: 'G7', G8: 'H7'
}