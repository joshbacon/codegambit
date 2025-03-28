import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import VisualState from "../models/visualstate";

const initialState: VisualState = {
    boardTheme: 'dark',
    selected: '',
    previousMove: '',
    validMoves: [],
    mateSquare: '',
}

export const visualSlice = createSlice({
    name: 'visual',
    initialState,
    reducers: {
        setBoardTheme: (state, action: PayloadAction<string>) => {
            state.boardTheme = action.payload;
        },
        setSelected: (state, action: PayloadAction<string>) => {
            state.selected = action.payload;
        },
        setPreviousMove: (state, action: PayloadAction<string>) => {
            state.previousMove = action.payload;
        },
        setValidMoves: (state, action: PayloadAction<string[]>) => {
            state.validMoves = action.payload;
        },
        setMateSquare: (state, action: PayloadAction<string>) => {
            state.mateSquare = action.payload;
        },
    }
});

export const { setBoardTheme, setSelected, setPreviousMove,setValidMoves,setMateSquare} = visualSlice.actions;

export default visualSlice.reducer;