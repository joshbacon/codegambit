const initialState = {
    id: '74',
    email: 'user@code.gambit',
    name: 'user',
    password: 'pass',

};

export default function user(state = initialState, action) {
    switch (action.type) {
        case 'LOG_IN':
            return state;
        case 'LOG_OUT':
            return state;
        default:
            return state;
    }
}