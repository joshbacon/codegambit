import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import GameState from "../models/gamestate"

const initialState: GameState = {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    started: false,
    aiDepth: 2,
    playingAs: 'w',
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
    }
});

export const { setFEN, setStarted, setAIDepth, setPlayingAs} = gameSlice.actions;


export default gameSlice.reducer;