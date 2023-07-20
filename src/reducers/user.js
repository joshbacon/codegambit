const initialState = {
    email: 'user@code.gambit',
    name: 'user',
    password: 'pass',

};

export default function user(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}