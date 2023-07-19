import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux"
import { createBrowserHistory } from "@remix-run/router"
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import game from '../reducers/game';


const persistConfig = {
    key: "root",
    version: 1,
    storage
};

const reducers = combineReducers({
    game,
    routing: routerReducer
});

const persistentReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistentReducer
});

const browserHistory = createBrowserHistory();
export const history = syncHistoryWithStore(browserHistory, store);
