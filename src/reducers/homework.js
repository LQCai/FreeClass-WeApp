import {
    HOMEWORK_LIST,
    HOMEWORK_POST,
    HOMEWORK_SUBMIT,
    HOMEWORK_EDIT,
    HOMEWORK_DELETE,
    HOMEWORK_SUBMIT_LIST,
    HOMEWORK_SUBMIT_INFO
} from '../canstants/homework';

const INITAL_STATE = {
    homeworkList: [],
    postResult: "",
    submitResult: "",
    editResult: "",
    deleteResult: "",
    homeworkSubmitList: [],
    homeworkSubmitInfo: {}
}

export default function homework(state = INITAL_STATE, action) {
    const type = action.type;
    const payload = action.payload;

    switch (type) {
        case HOMEWORK_LIST:
            return {
                ...state,
                homeworkList: payload,
            }
        case HOMEWORK_POST:
            return {
                ...state,
                postResult: payload,
            }
        case HOMEWORK_EDIT:
            return {
                ...state,
                editResult: payload,
            }
        case HOMEWORK_SUBMIT:
            return {
                ...state,
                submitResult: payload,
            }
        case HOMEWORK_DELETE:
            return {
                ...state,
                deleteResult: payload,
            }
        case HOMEWORK_SUBMIT_LIST:
            return {
                ...state,
                homeworkSubmitList: payload
            }
        case HOMEWORK_SUBMIT_INFO:
            return {
                ...state,
                homeworkSubmitInfo: payload
            }
        default:
            return state
    }
}