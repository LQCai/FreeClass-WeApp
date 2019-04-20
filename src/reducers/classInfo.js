import {
    CLASS_CREATE,
    CLASS_DELETE,
    CLASS_JOIN,
    CLASS_LIST,
    CLASS_QUIT,
    CLASS_UPDATE
} from '../canstants/classInfo';

const INITAL_STATE = {
    classList: [],
}

export default function classInfo(state = INITAL_STATE, action) {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case CLASS_LIST:
            return {
                ...state,
                classList: payload,
            };
        case CLASS_CREATE:
            return {
                ...state,
                classList: payload,
            }
        default:
            return state
    }
}