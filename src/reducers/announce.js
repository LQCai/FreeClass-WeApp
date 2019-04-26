import {
    ANNOUNCE_DELETE,
    ANNOUNCE_EDIT,
    ANNOUNCE_LIST,
    ANNOUNCE_POST
} from '../canstants/announce';

const INITAL_STATE = {
    announceList: [],
    postResult: [],
    editResult: {},
    deleteResult: {},
}

export default function attendance(state = INITAL_STATE, action) {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case ANNOUNCE_DELETE:
            return {
                ...state,
                deleteResult: payload,
            };
        case ANNOUNCE_EDIT:
            return {
                ...state,
                editResult: payload,
            }
        case ANNOUNCE_LIST:
            return {
                ...state,
                announceList: payload,
            }
        case ANNOUNCE_POST:
            return {
                ...state,
                postResult: payload,
            }
        default:
            return state
    }
}