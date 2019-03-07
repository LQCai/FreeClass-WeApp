import { ADD, MINUS } from '../canstants/counter';

const INITAL_STATE = {
    num : 0,
}

export default function counter(state=INITAL_STATE,action) {
    switch(action.type) {
        case ADD:
        return {
            ...state,
            num:state.num + 1,
        }
        case MINUS:
        return {
            ...state,
            num:state.num - 1,
        }
        default:
        return state
    }
}