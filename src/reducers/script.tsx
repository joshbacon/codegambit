import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ScriptState from "../models/scriptstate";

const initialState: ScriptState = {
    loadedScript: '',
}

export const gameSlice = createSlice({
    name: 'script',
    initialState,
    reducers: {
        setScript: (state, action: PayloadAction<string>) => {
            state.loadedScript = action.payload;
        },
    }
});

export const { setScript } = gameSlice.actions;


export default gameSlice.reducer;