import {
    ATTENDANCE_CHECK_LIST,
    ATTENDANCE_DROP,
    ATTENDANCE_LIST,
    ATTENDANCE_START_DIGITAL,
    ATTENDANCE_STOP,
    ATTENDANCE_INFO_REAL_TIME,
    ATTENDANCE_CHECK_IN
} from '../canstants/attendance';
import wreq from '../utils/request';
import config from '../config';

/**
 * 开始数字考勤
 * @param {*} classId 
 * @param {*} teacherId 
 */
export const startDigtal = (classId, teacherId) => dispatch => new Promise(
    (resolve, reject) => {
        console.log(classId);
        console.log(teacherId);
        wreq.request({
            url: `${config.server.host}/user/attendance/startDigital`,
            method: 'POST',
            data: {
                startData: {
                    classId: classId,
                    teacherId: teacherId
                }
            }
        }).then((res) => {
            dispatch({
                type: ATTENDANCE_START_DIGITAL,
                payload: res.data.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);

/**
 * 获取指定课堂考勤列表
 * @param {*} classId 
 */
export const getAttendanceList = (classId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/attendance/list`,
            method: 'GET',
            data: {
                classId: classId
            }
        }).then((res) => {
            dispatch({
                type: ATTENDANCE_LIST,
                payload: res.data.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);

/**
 * 获取实时考勤信息
 */
export const getAttendanceRealTimeInfo = (attendanceId, classId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/attendance/startingInfo`,
            method: 'GET',
            data: {
                attendanceId: attendanceId,
                classId: classId
            }
        }).then((res) => {
            dispatch({
                type: ATTENDANCE_INFO_REAL_TIME,
                payload: res.data.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);

/**
 * 停止考勤
 * @param {*} attendanceId 
 * @param {*} classId 
 * @param {*} teacherId 
 */
export const stopAttendance = (attendanceId, classId, teacherId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/attendance/stop`,
            method: 'PUT',
            data: {
                stopData: {
                    attendanceId: attendanceId,
                    classId: classId,
                    teacherId: teacherId
                }
            }
        }).then((res) => {
            dispatch({
                type: ATTENDANCE_STOP,
                payload: res.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);

/**
 * 放弃考勤
 * @param {*} attendanceId 
 * @param {*} classId 
 * @param {*} teacherId 
 */
export const dropAttendance = (attendanceId, classId, teacherId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/attendance/drop`,
            method: 'DELETE',
            data: {
                dropData: {
                    attendanceId: attendanceId,
                    classId: classId,
                    teacherId: teacherId
                }
            }
        }).then((res) => {
            dispatch({
                type: ATTENDANCE_DROP,
                payload: res.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);

/**
 * 学生签到
 * @param {*} attendanceId 
 * @param {*} classId 
 * @param {*} studentId 
 */
export const checkIn = (attendanceId, classId, studentId, code) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/attendance/checkIn`,
            method: 'POST',
            data: {
                checkData: {
                    attendanceId: attendanceId,
                    classId: classId,
                    studentId: studentId,
                    code: code
                }
            }
        }).then((res) => {
            dispatch({
                type: ATTENDANCE_CHECK_IN,
                payload: res.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);

/**
 * 获取指定考勤签到记录
 * @param {*} attendanceId 
 * @param {*} classId 
 */
export const getCheckList = (attendanceId, classId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/attendance/checkList`,
            method: 'GET',
            data: {
                attendanceId: attendanceId,
                classId: classId
            }
        }).then((res) => {
            dispatch({
                type: ATTENDANCE_CHECK_LIST,
                payload: res.data.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);

