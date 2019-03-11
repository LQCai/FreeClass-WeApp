import { OPENID_EXIST } from '../canstants/openId';

const INITAL_STATE = {
    openIdExist: false,
}

export default function openId(state = INITAL_STATE, action) {
    console.log(action.openIdCache);
    switch (action.type) {
        case OPENID_EXIST:
            return {
                ...state,
                openIdExist: action.openIdCache,
            }
        default:
            return state
    }
}