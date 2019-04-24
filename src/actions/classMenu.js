import {
    CLASS_MENU_OPEN,
    CLASS_MENU_CLOES,
    CLASS_ITEM_INFO,
    HOMEWORK_ITEM_INFO
} from '../canstants/classMenu';
import config from '../config';

export const open = () => {
    return {
        type: CLASS_MENU_OPEN
    }
}

export const close = () => {
    return {
        type: CLASS_MENU_CLOES
    }
}

export const showClassItem = (classInfo, role) => {
    let item = [];
    if (role == config.role.teacher) {
        item = [
            {
                name: '编辑班级',
                action: ''
            },
            {
                name: '删除班级',
                action: ''
            }
        ];
    }
    if (role == config.role.student) {
        item = [
            {
                name: '退出班级',
                action: ''
            }
        ];
    }
    return {
        type: CLASS_ITEM_INFO,
        payload: {
            isOpen: true,
            classInfo: classInfo,
            role: role,
            item: item
        }
    }
};

export const closeClassItem = () => {
    return {
        type: CLASS_ITEM_INFO,
        payload: {
            isOpen: false,
            classInfo: {},
            role: '',
            item: []
        }
    }
};


export const showHomeworkItem = (homeworkInfo, role) => {
    return {
        type: HOMEWORK_ITEM_INFO,
        payload: {
            sheet: true,
            homeworkInfo: homeworkInfo,
            role: role
        }
    }
};

/**
 * 收起作业的sheet
 */
export const closeHomeworkItem = () => {
    return {
        type: HOMEWORK_ITEM_INFO,
        payload: {
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
};

