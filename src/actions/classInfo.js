import {
    CLASS_CREATE,
    CLASS_DELETE,
    CLASS_JOIN,
    CLASS_LIST,
    CLASS_QUIT,
    CLASS_UPDATE
} from '../canstants/classInfo';
import wreq from '../utils/request';
import config from '../config';

export const getClassList = (userId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/class/list`,
            method: 'GET',
            data: {
                id: userId
            }
        }).then((res) => {
            dispatch({
                type: CLASS_LIST,
                payload: res.data.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    });
