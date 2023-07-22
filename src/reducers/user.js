const initialState = {
    id: '',
    email: '',
    name: '',
    password: '',

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