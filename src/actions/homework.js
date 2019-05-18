import {
    HOMEWORK_LIST,
    HOMEWORK_POST,
    HOMEWORK_SUBMIT,
    HOMEWORK_EDIT,
    HOMEWORK_DELETE,
    HOMEWORK_SUBMIT_LIST,
    HOMEWORK_SUBMIT_INFO
} from '../canstants/homework';
import wreq from '../utils/request';
import config from '../config';
import Taro from '@tarojs/taro';


/**
 * 获取作业列表
 * @param {*} classId 
 */
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

/**
 * 发布作业
 * @param {*} teacherId 
 * @param {*} title 
 * @param {*} classId 
 * @param {*} content 
 * @param {*} deadline 
 * @param {*} file 
 */
export const postHomework = (
    teacherId,
    title,
    classId,
    content,
    date,
    formId,
    file) => dispatch => new Promise(
        (resolve, reject) => {
            console.log(formId);
            if (file.length == 0) {
                wreq.request({
                    url: `${config.server.host}/user/homework/postText`,
                    method: 'POST',
                    data: {
                        teacherId: teacherId,
                        homeworkName: title,
                        classId: classId,
                        homeworkIntroduction: content,
                        formId: formId,
                        date: date
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
            } else {
                Taro.uploadFile({
                    url: `${config.server.host}/user/homework/post`,
                    filePath: file[0].url,
                    name: 'annex',
                    formData: {
                        teacherId: teacherId,
                        homeworkName: title,
                        classId: classId,
                        homeworkIntroduction: content,
                        formId: formId,
                        deadline: date + " 00:00:00"
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
        }
    );

/**
 * 修改发布作业
 * @param {*} teacherId 
 * @param {*} classId 
 * @param {*} name 
 * @param {*} id 
 * @param {*} introduction 
 * @param {*} date 
 * @param {*} url 
 */
export const editHomework = (
    classId,
    name,
    id,
    introduction,
    date,
    file) => dispatch => new Promise(
        (resolve, reject) => {
            console.log(introduction);
            console.log(date);
            console.log(name);
            if (file.length == 0) {
                wreq.request({
                    url: `${config.server.host}/user/homework/editText`,
                    method: 'POST',
                    data: {
                        teacherId: Taro.getStorageSync('userInfo').id,
                        classId: classId,
                        homeworkName: name,
                        id: id,
                        homeworkIntroduction: introduction,
                        date: date
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
            } else {
                Taro.uploadFile({
                    url: `${config.server.host}/user/homework/edit`,
                    filePath: file[0].url,
                    name: 'annex',
                    formData: {
                        teacherId: Taro.getStorageSync('userInfo').id,
                        classId: classId,
                        homeworkName: name,
                        id: id,
                        homeworkIntroduction: introduction,
                        deadline: date + " 00:00:00"
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
        }
    );


/**
 * 删除作业
 * @param {*} deleteData 
 */
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


/**
 * 获取学生提交作业列表
 * @param {*} classId 
 * @param {*} homeworkId 
 */
export const getSubmitList = (classId, homeworkId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/homework/studentList`,
            method: 'GET',
            data: {
                classId: classId,
                homeworkId: homeworkId
            }
        }).then((res) => {
            dispatch({
                type: HOMEWORK_SUBMIT_LIST,
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
 * 获取学生提交作业状态信息
 * @param {*} classId 
 * @param {*} homeworkId 
 */
export const getHomeworkSubmitInfo = (studentId, homeworkId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/homework/submitStatus`,
            method: 'GET',
            data: {
                studentId: studentId,
                homeworkId: homeworkId
            }
        }).then((res) => {
            dispatch({
                type: HOMEWORK_SUBMIT_INFO,
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
 * 提交作业
 * @param {*} studentId 
 * @param {*} classId 
 * @param {*} homeworkId 
 * @param {*} content 
 * @param {*} url 
 */
export const submitHomework = (
    studentId,
    classId,
    homeworkId,
    content,
    url) => dispatch => new Promise(
        (resolve, reject) => {
            Taro.uploadFile({
                url: `${config.server.host}/user/homework/submit`,
                filePath: url,
                name: 'annex',
                formData: {
                    studentId: studentId,
                    classId: classId,
                    homeworkId: homeworkId,
                    homeworkContent: content
                }
            }).then((res) => {
                dispatch({
                    type: HOMEWORK_SUBMIT,
                    payload: res.data
                });
                return resolve(res.data);
            }).catch((e) => {
                console.log(e);
                return reject(e);
            });
        }
    );