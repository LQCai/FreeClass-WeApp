import {
    OPEN_DATA,
    USER_INFO,
    USER_REGISTER,
    USER_UPDATE
} from '../canstants/user';

const INITIAL_STATE = {
    openData: {},
    userInfo: {},
    register: {},
    updateResult: "",
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
        case USER_UPDATE:
            return {
                ...state,
                updateResult: payload
            }
        default:
            return state;
    }
}