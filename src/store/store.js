import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux"
import { createBrowserHistory } from "@remix-run/router"
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'

import game from '../reducers/game';

export const store = configureStore({
    reducer: combineReducers({
        game,
        routing: routerReducer
    })
});

const browserHistory = createBrowserHistory();
export const history = syncHistoryWithStore(browserHistory, store);
