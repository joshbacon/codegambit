const initialState = {
    inGame: false,
    playingAs: 'w',
    selected: '',
    aiLevel: 2,
    FEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    // use the engine option of without memory and keep track of moves yourself
    moves: [],
    commands: [
        'Welcome to code_gambit! We teach coding through playing chess.',
        'type help(method) to see how to use a given method or check out the documentation for a list of commands.'
    ]
}

export default function game(state = initialState, action) {
    // console.log(state);
    switch (action.type) {
        case 'START_GAME':
            let temp = {
                ...state,
                inGame: true,
                selected: '',
                playingAs: action.playingAs,
                position: action.position
            }
            console.log(temp)
            return temp
        case 'FINISH_GAME':
            return  {
                ...state,
                inGame: false
            }
        case 'SET_AILEVEL':
            return  {
                ...state,
                aiLevel: action.aiLevel
            }
        case 'SET_POSITION':
            return  {
                ...state,
                position: action.position
            }
        case 'SET_SELECTED':
            let teamp = {
                ...state,
                selected: action.selected
            }
            console.log(teamp)
            return teamp
        case 'SET_PLAYINGAS':
            console.log(state)
            let temo = {
                ...state,
                playingAs: action.playingAs
            }
            console.log(temo)
            return temo
        case 'SET_COMMANDS':
            return {
                ...state,
                commands: action.commands
            }
        default:
            return state;
    }
}