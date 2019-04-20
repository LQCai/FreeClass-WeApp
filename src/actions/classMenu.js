import {
    CLASS_MENU_OPEN,
    CLASS_MENU_CLOES,
    CLASS_ITEM_INFO
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

