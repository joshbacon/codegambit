const initialState = {
    inGame: false,
    playingAs: 'w',
    selected: '',
    aiLevel: 2,
    game: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RKBQKBNR w KQkq - 0 1',
    moves: [],
    commands: [
        'Welcome to code_gambit! We teach coding through playing chess.',
        'type help(method) to see how to use a given method or check out the documentation for a list of commands.'
    ],
    prevCommand: ''
}

export default function game(state = initialState, action) {
    // console.log(state);
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
            let next = {
                ...state,
                game: action.position
            };
            return next;
        case 'SET_SELECTED':
            let teamp = {
                ...state,
                selected: action.selected
            }
            return teamp
        case 'SET_PLAYING_AS':
            let temo = {
                ...state,
                playingAs: action.playingAs
            }
            return temo
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
        default:
            return state;
    }
}