import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../reducers/game';
import visualReducer from '../reducers/visual';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    visual: visualReducer,
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];