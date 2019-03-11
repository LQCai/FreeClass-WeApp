import { CLASS_MENU_OPEN, CLASS_MENU_CLOES } from '../canstants/classMenu';

const INITAL_STATE = {
    isOpen : false,
}

export default function classMenu(state=INITAL_STATE,action) {
    switch(action.type) {
        case CLASS_MENU_OPEN:
        return {
            ...state,
            isOpen:true,
        }
        case CLASS_MENU_CLOES:
        return {
            ...state,
            isOpen:false,
        }
        default:
        return state
    }
}