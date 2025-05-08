import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../reducers/game';
import visualReducer from '../reducers/visual';
import scriptReducer from '../reducers/script';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    visual: visualReducer,
    script: scriptReducer,
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];