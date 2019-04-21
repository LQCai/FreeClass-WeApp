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
    }
);

export const createClass = (userId, className, topping) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/class/create`,
            method: 'POST',
            data: {
                class: {
                    teacherId: userId,
                    className: className,
                    peopleMaximum: 100,
                    topping: topping
                }
            }
        }).then((res) => {
            dispatch({
                type: CLASS_CREATE,
                payload: res.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);


export const editClass = (classId, userId, className, topping) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/class/update`,
            method: 'PUT',
            data: {
                class: {
                    id: classId,
                    teacherId: userId,
                    className: className,
                    peopleMaximum: 100,
                    topping: topping
                }
            }
        }).then((res) => {
            dispatch({
                type: CLASS_UPDATE,
                payload: res.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);

export const deleteClass = (userId, classId, className) => dispatch => new Promise(
    (resolve, reject) => {
        console.log('userId:' + userId + ' classId:' + classId + ' className:' + className);
        wreq.request({
            url: `${config.server.host}/user/class/delete`,
            method: 'DELETE',
            data: {
                deleteData: {
                    userId: userId,
                    classId: classId,
                    className: className,
                }
            },
            header: {
                'content-type': 'application/json'
            }
        }).then((res) => {
            dispatch({
                type: CLASS_DELETE,
                payload: res.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
)


export const joinClass = (userId, code) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/class/join`,
            method: 'POST',
            data: {
                joinData: {
                    userId: userId,
                    code: code
                }
            },
            header: {
                'content-type': 'application/json'
            }
        }).then((res) => {
            dispatch({
                type: CLASS_JOIN,
                payload: res.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
)
