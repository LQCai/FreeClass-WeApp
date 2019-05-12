import {
    DETECTION_LIST,
    DETECTION_COLLECT,
    DETECTION_COLLECT_CANCEL,
    DETECTION_COMMENT,
    DETECTION_COMMENT_CANCEL,
    DETECTION_DELETE,
    DETECTION_DETAIL,
    DETECTION_POST
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
 * 发布动态
 * @param {*} content 
 * @param {*} userId 
 * @param {*} images 
 */
export const postDetection = (
    content,
    userId,
    images) => dispatch => new Promise(
        (resolve, reject) => {
            if (images.length <= 0) {
                wreq.request({
                    url: `${config.server.host}/user/article/add`,
                    method: 'POST',
                    data: {
                        userId: userId,
                        content: content
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
            } else {
                Taro.uploadFile({
                    url: `${config.server.host}/user/article/add`,
                    filePath: images[i],
                    name: 'images',
                    formData: {
                        userId: userId,
                        content: content
                    }
                }).then((res) => {
                    dispatch({
                        type: DETECTION_POST,
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