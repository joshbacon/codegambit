import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import VisualState from "../models/visualstate";

const initialState: VisualState = {
    boardTheme: 'dark',
    selected: '',
    previousMoveFrom: '',
    previousMoveTo: '',
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
        setPreviousMoveFrom: (state, action: PayloadAction<string>) => {
            state.previousMoveFrom = action.payload;
        },
        setPreviousMoveTo: (state, action: PayloadAction<string>) => {
            state.previousMoveTo = action.payload;
        },
        setValidMoves: (state, action: PayloadAction<string[]>) => {
            state.validMoves = action.payload;
        },
        setMateSquare: (state, action: PayloadAction<string>) => {
            state.mateSquare = action.payload;
        },
        clearShowing: (state) => {
            state.selected = initialState.selected;
            state.previousMoveFrom = initialState.previousMoveFrom;
            state.previousMoveTo = initialState.previousMoveTo;
            state.validMoves = initialState.validMoves;
            state.mateSquare = initialState.mateSquare;
        }
    }
});

export const { setBoardTheme, setSelected, setPreviousMoveFrom, setPreviousMoveTo, setValidMoves, setMateSquare, clearShowing } = visualSlice.actions;

export default visualSlice.reducer;