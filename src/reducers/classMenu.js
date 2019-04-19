import {
    CLASS_MENU_OPEN,
    CLASS_MENU_CLOES,
    CLASS_ITEM_INFO
} from '../canstants/classMenu';

const INITAL_STATE = {
    isOpen: false,
    classItemInfo: {
        isOpen: false,
        classId: '',
        role: '',
        item: []
    }
}

export default function classMenu(state = INITAL_STATE, action) {
    const type = action.type;
    const payload = action.payload;
    switch (action.type) {
        case CLASS_MENU_OPEN:
            return {
                ...state,
                isOpen: true,
            };
        case CLASS_MENU_CLOES:
            return {
                ...state,
                isOpen: false,
            };
        case CLASS_ITEM_INFO:
            return {
                ...state,
                classItemInfo: payload
            };
        default:
            return state;
    }
}