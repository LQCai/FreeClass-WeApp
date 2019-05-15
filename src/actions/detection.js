import {
    DETECTION_LIST,
    DETECTION_COLLECT,
    DETECTION_COLLECT_CANCEL,
    DETECTION_COMMENT,
    DETECTION_COMMENT_CANCEL,
    DETECTION_DELETE,
    DETECTION_DETAIL,
    DETECTION_POST,
    DETECTION_IMAGE_LIST
} from '../canstants/detection';
import wreq from '../utils/request';
import config from '../config';
import Taro from '@tarojs/taro';

/**
 * 获取动态列表
 * @param {*} pageIndex 
 */
export const getDetectionList = (pageIndex) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/article/list`,
            method: 'GET',
            data: {
                pageIndex: pageIndex
            }
        }).then((res) => {
            dispatch({
                type: DETECTION_LIST,
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
 * 上传文件
 * @param {*} images 
 */
export const uploadFiles = (images) => dispatch => new Promise(
    (resolve, reject) => {
        let imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            Taro.uploadFile({
                url: `${config.server.host}/user/article/upload`,
                filePath: images[i]['url'],
                name: 'image',
                formData: null
            }).then((res) => {
                const resObj = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
                if (resObj.code == config.code.fail) {
                    return reject(resObj);
                }
                imageUrls = imageUrls.concat(resObj.data);
                console.log(imageUrls);
                dispatch({
                    type: DETECTION_IMAGE_LIST,
                    payload: imageUrls
                });
                if (i == images.length - 1) {
                    return resolve(resObj);
                }
            }).catch((e) => {
                console.log(e);
                return reject(e);
            });
        }
    }
);

/**
 * 发布动态
 * @param {*} content 
 * @param {*} userId 
 * @param {*} imageUrls 
 */
export const postDetection = (
    content,
    userId,
    imageUrls) => dispatch => new Promise(
        (resolve, reject) => {
            console.log(imageUrls);
            console.log(content);
            console.log(userId);
            wreq.request({
                url: `${config.server.host}/user/article/add`,
                method: 'POST',
                data: {
                    userId: userId,
                    content: content,
                    images: imageUrls
                }
            }).then((res) => {
                dispatch({
                    type: DETECTION_POST,
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
 * 动态收藏
 * @param {*} userId 
 * @param {*} articleId 
 */
export const collect = (
    articleId) => dispatch => new Promise(
        (resolve, reject) => {
            console.log(articleId);
            wreq.request({
                url: `${config.server.host}/user/article/collect`,
                method: 'POST',
                data: {
                    data: {
                        userId: Taro.getStorageSync('userInfo').id,
                        articleId: articleId
                    }
                }
            }).then((res) => {
                dispatch({
                    type: DETECTION_COLLECT,
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
 * 取消收藏
 * @param {*} userId 
 * @param {*} articleId 
 */
export const collectCancel = (
    articleId) => dispatch => new Promise(
        (resolve, reject) => {
            console.log(articleId);
            wreq.request({
                url: `${config.server.host}/user/article/cancelCollect`,
                method: 'PUT',
                data: {
                    data: {
                        userId: Taro.getStorageSync('userInfo').id,
                        articleId: articleId
                    }
                }
            }).then((res) => {
                dispatch({
                    type: DETECTION_COLLECT_CANCEL,
                    payload: res.data.data
                });
                return resolve(res.data);
            }).catch((e) => {
                console.log(e);
                return reject(e);
            });
        }
    );