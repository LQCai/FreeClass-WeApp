import {
    HOMEWORK_LIST,
    HOMEWORK_POST,
    HOMEWORK_SUBMIT,
    HOMEWORK_EDIT,
    HOMEWORK_DELETE
} from '../canstants/homework';
import wreq from '../utils/request';
import config from '../config';
import Taro from '@tarojs/taro';


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


export const postHomework = (
    teacherId,
    title,
    classId,
    content,
    deadline,
    url) => dispatch => new Promise(
        (resolve, reject) => {
            Taro.uploadFile({
                url: `${config.server.host}/user/homework/post`,
                filePath: url,
                name: 'annex',
                formData: {
                    teacherId: teacherId,
                    homeworkName: title,
                    classId: classId,
                    homeworkIntroduction: content,
                    sendByEmail: 2,
                    fullScore: 100,
                    deadline: deadline
                }
            }).then((res) => {
                dispatch({
                    type: HOMEWORK_POST,
                    payload: res.data
                });
                return resolve(res.data);
            }).catch((e) => {
                console.log(e);
                return reject(e);
            });
        }
    );

export const editHomework = (
    teacherId,
    classId,
    name,
    id,
    introduction,
    deadline,
    url) => dispatch => new Promise(
        (resolve, reject) => {
            console.log(teacherId);
            console.log(classId);
            console.log(name);
            console.log(id);
            console.log(introduction);
            console.log(deadline);
            Taro.uploadFile({
                url: `${config.server.host}/user/homework/edit`,
                filePath: url,
                name: 'annex',
                formData: {
                    teacherId: teacherId,
                    classId: classId,
                    homeworkName: name,
                    id: id,
                    homeworkIntroduction: introduction,
                    sendByEmail: 2,
                    fullScore: 100,
                    deadline: deadline
                }
            }).then((res) => {
                dispatch({
                    type: HOMEWORK_EDIT,
                    payload: res.data
                });
                return resolve(res.data);
            }).catch((e) => {
                console.log(e);
                return reject(e);
            });
        }
    );


export const deleteHomework = (deleteData) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/homework/delete`,
            method: 'DELETE',
            data: {
                deleteData: deleteData
            }
        }).then((res) => {
            dispatch({
                type: HOMEWORK_DELETE,
                payload: res.data.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);