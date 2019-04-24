import {
    CLASS_MENU_OPEN,
    CLASS_MENU_CLOES,
    CLASS_ITEM_INFO,
    HOMEWORK_ITEM_INFO
} from '../canstants/classMenu';

const INITAL_STATE = {
    isOpen: false,
    classItemInfo: {
        isOpen: false,
        classId: '',
        role: '',
        item: [],
        classInfo: {
            id: '',
            invitationCode: '',
            name: '',
            peopleCount: 0
        }
    },
    homeworkItemInfo: {
        sheet: false,
        homeworkInfo: {
            annexUrl: '',
            created: '',
            deadline: '',
            id: '',
            introduction: '',
            name: ''
        },
        role: ''
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
        case HOMEWORK_ITEM_INFO:
            return {
                ...state,
                homeworkItemInfo: payload
            };
        default:
            return state;
    }
}