import {
    HOMEWORK_LIST,
    HOMEWORK_POST,
    HOMEWORK_SUBMIT,
    HOMEWORK_EDIT,
    HOMEWORK_DELETE
} from '../canstants/homework';
import wreq from '../utils/request';
import config from '../config';

export const getHomeworkList = (classId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/homework/list`,
            method: 'GET',
            data: {
                classId: classId
            }
        }).then((res) => {
            dispatch({
                type: HOMEWORK_LIST,
                payload: res.data.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);


export const postHomework = (userId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/class/list`,
            method: 'GET',
            data: {
                id: userId
            }
        }).then((res) => {
            dispatch({
                type: HOMEWORK_POST,
                payload: res.data.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);