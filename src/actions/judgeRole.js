import {
    ROLE_TEACHER,
    ROLE_STUDENT
} from '../canstants/judgeRole';

export const isTeacher = (role) => {
    return {
        role,
        type : ROLE_TEACHER
    }
}

export const isStudent = (role) => {
    return {
        role,
        type : ROLE_STUDENT
    }
}

