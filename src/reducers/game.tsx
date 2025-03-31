import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import GameState from "../models/gamestate"
import Move from "../models/move";

const initialState: GameState = {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    started: false,
    aiDepth: 2,
    playingAs: 'w',
    singlePlayer: true,
    moveHistory: [],
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setFEN: (state, action: PayloadAction<string>) => {
            state.fen = action.payload;
        },
        setStarted: (state, action: PayloadAction<boolean>) => {
            state.started = action.payload;
        },
        setAIDepth: (state, action: PayloadAction<number>) => {
            state.aiDepth = action.payload;
        },
        setPlayingAs: (state, action: PayloadAction<string>) => {
            state.playingAs = action.payload;
        },
        setSinglePlayer: (state, action: PayloadAction<boolean>) => {
            state.singlePlayer = action.payload;
        },
        setMoveHistory: (state, action: PayloadAction<Move>) => {
            state.moveHistory.push(action.payload);
        },
    }
});

export const { setFEN, setStarted, setAIDepth, setPlayingAs, setSinglePlayer, setMoveHistory } = gameSlice.actions;


export default gameSlice.reducer;