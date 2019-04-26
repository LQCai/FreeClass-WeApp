import {
    ATTENDANCE_CHECK_LIST,
    ATTENDANCE_DROP,
    ATTENDANCE_LIST,
    ATTENDANCE_START_DIGITAL,
    ATTENDANCE_STOP
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