import {createStore} from "redux"

const initialState = {
    inGame: false,
    playingAs: 'w',
    selected: '',
    position: {}
}

function handleState(state = initialState, action) {
    switch (action.type) {
        case 'START_GAME':
            return  {
                ...state,
                inGame: true
            }
        case 'FINISH_GAME':
            return  {
                ...state,
                inGame: false
            }
        case 'SET_POSITION':
            return  {
                ...state,
                position: action.position
            }
        default:
            return state;
    }
}

const store = createStore(handleState)

export default store;