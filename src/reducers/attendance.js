import {
    ATTENDANCE_CHECK_LIST,
    ATTENDANCE_DROP,
    ATTENDANCE_LIST,
    ATTENDANCE_START_DIGITAL,
    ATTENDANCE_STOP,
    ATTENDANCE_INFO_REAL_TIME,
    ATTENDANCE_CHECK_IN
} from '../canstants/attendance';

const INITAL_STATE = {
    attendanceList: [],
    checkList: [],
    startDigitalResult: {},
    stopResult: {},
    dropResult: {},
    attendanceRealInfo: {},
    checkResult: {}
}

export default function attendance(state = INITAL_STATE, action) {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case ATTENDANCE_START_DIGITAL:
            return {
                ...state,
                startDigitalResult: payload,
            };
        case ATTENDANCE_STOP:
            return {
                ...state,
                stopResult: payload,
            }
        case ATTENDANCE_DROP:
            return {
                ...state,
                dropResult: payload,
            }
        case ATTENDANCE_LIST:
            return {
                ...state,
                attendanceList: payload,
            }
        case ATTENDANCE_CHECK_LIST:
            return {
                ...state,
                checkList: payload,
            }
        case ATTENDANCE_INFO_REAL_TIME:
            return {
                ...state,
                attendanceRealInfo: payload,
            }
        case ATTENDANCE_CHECK_IN:
            return {
                ...state,
                checkResult: payload,
            }
        default:
            return state
    }
}