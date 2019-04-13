import {
    OPEN_DATA,
    USER_INFO,
    USER_REGISTER
} from '../canstants/user';

const INITIAL_STATE = {
    openData: {},
    userInfo: {},
    register: {},
};

export default function user(state = INITIAL_STATE, action) {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case OPEN_DATA:
            return {
                ...state,
                openData: payload
            };
        case USER_INFO:
            return {
                ...state,
                userInfo: payload
            };
        case USER_REGISTER:
            return {
                ...state,
                register: payload
            };
        default:
            return state;
    }
}