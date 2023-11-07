const initialState = {
    inGame: false,
    playingAs: 'w',
    selected: '',
    aiLevel: 2,
    game: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    history: [],
    validMoves: [],
    commands: [
        'Welcome to code_gambit! We teach coding through playing chess.',
        'type help(method) to see how to use a given method or check out the documentation for a list of commands.'
    ],
    prevCommand: ''
}

export default function game(state = initialState, action) {
    switch (action.type) {
        case 'START_GAME':
            let temp = {
                ...state,
                inGame: true,
                selected: ''
            }
            return temp
        case 'FINISH_GAME':
            return  {
                ...state,
                inGame: false
            }
        case 'SET_AI_LEVEL':
            return  {
                ...state,
                aiLevel: action.aiLevel
            }
        case 'SET_POSITION':
            return {
                ...state,
                game: action.position
            }
        case 'SET_FROM_FEN':
            return {
                ...state,
                game: action.position
            }
        case 'SET_SELECTED':
            return {
                ...state,
                selected: action.selected
            }
        case 'SET_PLAYING_AS':
            return {
                ...state,
                playingAs: action.playingAs
            }
        case 'SET_COMMANDS':
            return {
                ...state,
                commands: action.commands
            }
        case 'SET_PREV_COMMAND':
            return {
                ...state,
                prevCommand: action.prevCommand
            }
        case 'SET_HISTORY':
            return {
                ...state,
                history: action.history
            }
        case 'SET_VALID_MOVES':
            return {
                ...state,
                validMoves: action.moves
            }
        case 'RESET':
            return {
                ...state,
                inGame: false,
                selected: '',
                game: initialState.game,
                history: [],
                validMoves: []
            }
        case 'FIX':
            return initialState
        default:
            return state;
    }
}