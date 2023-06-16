const initialState = {
    inGame: false,
    playingAs: 'w',
    selected: '',
    position: {pieces: {A1: "R", A2: "P", A7: "p", A8: "r", B1: "N", B2: "P", B7: "p", B8: "n", C1: "B", C2: "P", C7: "p", C8: "b", D1: "Q", D2: "P", D7: "p", D8: "q", E1: "K", E2: "P", E7: "p", E8: "k", F1: "B", F2: "P", F7: "p", F8: "b", G1: "N", G2: "P", G7: "p", G8: "n", H1: "R", H2: "P", H7: "p", H8: "r"}},
    commands: [
        'Welcome to code_gambit! We teach coding through playing chess.',
        'type help(method) to see how to use a given method or check out the documentation for a list of commands.'
    ]
}

export default function game(state = initialState, action) {
    switch (action.type) {
        case 'START_GAME':
            return  {
                ...state,
                inGame: true,
                playingAs: action.playingAs,
                selected: action.selected,
                position: action.position,
                commands: action.commands
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
        case 'SET_SELECTED':
            return  {
                ...state,
                selected: action.selected
            }
        case 'SET_COMMANDS':
            return {
                ...state,
                commands: action.commands
            }
        default:
            return state;
    }
}