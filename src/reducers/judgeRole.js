import { ROLE_TEACHER, ROLE_STUDENT } from '../canstants/judgeRole';

const INITAL_STATE = {
    actions: [
        {id: 0, title: '退出班级', role: 1}
    ],
}

export default function counter(state=INITAL_STATE,action) {
    switch(action.type) {
        case ROLE_TEACHER:
        console.log("i do")
        return {
            ...state,
            actions:[
                {id: 0, title: '编辑班级', role:action.role},
                {id: 1, title: '删除班级', role:action.role},
                {id: 2, title: '归档班级', role:action.role}
            ]
        }
        case ROLE_STUDENT:
        return {
            ...state,
            actions:[
                {id: 0, title: '退出班级', role:action.role}
            ]
        }
        default:
        return state
    }
}