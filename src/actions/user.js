import {
    OPEN_DATA,
    USER_INFO,
    USER_REGISTER,
    USER_UPDATE,
} from '../canstants/user';
import config from '../config';
import wreq from '../utils/request';
import Taro from '@tarojs/taro';

/**
 * 获取openId信息('0000' => 成功, '500' => 未注册，但也返回openId)
 */
export const getOpenData = () => dispatch => new Promise(
    (resolve, reject) => {
        Taro.login().then((res) => {
            const code = res.code;

            wreq.request({
                url: `${config.server.host}/user/wechat/getAuthOpenId`,
                method: 'GET',
                data: {
                    code: code
                }
            }).then((res) => {
                const openData = res.data;

                dispatch({
                    type: OPEN_DATA,
                    payload: openData
                });

                return resolve(openData);
            }).catch((e) => {
                console.log(e);
                return reject(e);
            });
        });
    });


/**
 * 通过openId获取用户信息
 * 
 * @param {*} openId:微信小程序openid 
 */
export const getUserInfo = (openId) => dispatch => new Promise(
    (resolve, reject) => {
        wreq.request({
            url: `${config.server.host}/user/account/infoForOpenId`,
            method: 'GET',
            data: {
                openId: openId
            }
        }).then((res) => {
            dispatch({
                type: USER_INFO,
                payload: res.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    });

export const submitRegister = (openId, nickName) => dispatch => new Promise(
    (resolve, reject) => {
        const user = {
            openId: openId,
            nickName: nickName
        };
        wreq.request({
            url: `${config.server.host}/user/account/register`,
            method: 'POST',
            data: {
                user: user
            }
        }).then((res) => {
            if (res.data.code != config.code.success) {
                dispatch({
                    type: USER_REGISTER,
                    payload: false
                });
            } else {
                dispatch({
                    type: USER_REGISTER,
                    payload: true
                });
            }
            return resolve(res);
        }).catch((e) => {
            return reject(e);
        })
    });

/**
 * 提交信息修改
 * 
 * @param {*} openId 
 * @param {*} item 
 * @param {*} content 
 */
export const submitUpdate = (openId, item, content) => dispatch => new Promise(
    (resolve, reject) => {
        let userObject = {};

        switch (item) {
            case 'email':
                userObject = {
                    openId: openId,
                    email: content
                };
                break;
            case 'serialCode':
                userObject = {
                    openId: openId,
                    serialCode: content
                };
                break;
            case 'name':
                userObject = {
                    openId: openId,
                    name: content
                };
                break;
            default:
                userObject = {};
                break;
        }

        wreq.request({
            url: `${config.server.host}/user/account/update`,
            method: 'POST',
            data: {
                user: userObject
            }
        }).then((res) => {
            console.log(res.data);
            dispatch({
                type: USER_UPDATE,
                payload: res.data
            });
            return resolve(res.data);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    }
);
