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