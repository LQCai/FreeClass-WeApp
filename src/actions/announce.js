import {
    ANNOUNCE_DELETE,
    ANNOUNCE_EDIT,
    ANNOUNCE_LIST,
    ANNOUNCE_POST
} from '../canstants/announce';
import wreq from '../utils/request';
import config from '../config';
import Taro from '@tarojs/taro';

/**
 * 发布公告
 * @param {*} teacherId 
 * @param {*} title 
 * @param {*} classId 
 * @param {*} content 
 * @param {*} url 
 */
export const postAnnounce = (
    teacherId,
    title,
    classId,
    content,
    url) => dispatch => new Promise(
        (resolve, reject) => {
            Taro.uploadFile({
                url: `${config.server.host}/user/announcement/post`,
                filePath: url,
                name: 'annex',
                formData: {
                    teacherId: teacherId,
                    classId: classId,
                    title: title,
                    content: content
                }
            }).then((res) => {
                dispatch({
                    type: ANNOUNCE_POST,
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
* 编辑公告
* @param {*} teacherId 
* @param {*} title 
* @param {*} classId 
* @param {*} content 
* @param {*} id 
* @param {*} url 
*/
export const editAnnounce = (
    id,
    teacherId,
    title,
    classId,
    content,
    url) => dispatch => new Promise(
        (resolve, reject) => {
            Taro.uploadFile({
                url: `${config.server.host}/user/announcement/edit`,
                filePath: url,
                name: 'annex',
                formData: {
                    id: id,
                    teacherId: teacherId,
                    classId: classId,
                    title: title,
                    content: content
                }
            }).then((res) => {
                dispatch({
                    type: ANNOUNCE_EDIT,
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
 * 删除公告
 * @param {*} id 
 * @param {*} classId 
 * @param {*} teacherId 
 */
export const deleteAnnounce = (id, classId, teacherId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/announcement/delete`,
            method: 'DELETE',
            data: {
                deleteData: {
                    id: id,
                    classId: classId,
                    teacherId: teacherId
                }
            }
        }).then((res) => {
            dispatch({
                type: ANNOUNCE_DELETE,
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
* 获取公告列表
* @param {*} classId 
*/
export const getAnnounceList = (classId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/announcement/list`,
            method: 'GET',
            data: {
                classId: classId,
            }
        }).then((res) => {
            dispatch({
                type: ANNOUNCE_LIST,
                payload: res.data.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);
