import {
    CLASS_MENU_OPEN,
    CLASS_MENU_CLOES,
} from '../canstants/classMenu';

export const open = () => {
    return {
        type : CLASS_MENU_OPEN
    }
}

export const close = () => {
    return {
        type : CLASS_MENU_CLOES
    }
}

