import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import logo from '../../asset/freeClass.png';
import './auth.scss';
import wreq from '../../utils/request';
import config from '../../config';


export default class Auth extends Taro.Component {

    /**
     * 判断用户是否授权，
     * 授权后获取用户信息
     */
    bindGetUserInfo = (e) => {
        const userInfo = e.detail.userInfo;
        console.log(userInfo);

        if (userInfo) {
            Taro.login().then(res => {
                const code = res.code;
                let openId = '';
                this.getOpenId(code);
                // this.getUserInfoWithOpenId(openId);
                this.register(openId, userInfo);
            })
        }else {
            //未授权的操作
        }
    }

    /**
     * 获取openId（待完善）
     */
    getOpenId = (code) => {
        // console.log("123");
        wreq.request({
            url: `${config.server.host}/user/wechat/getAuthOpenId`,
            method: 'GET',
            data: {
                code: code,
            }
        }).then(res => {
            console.log("123");
            openId = res.data.data.openId;
            console.log(res.data);
            
        });
    }

    /**
     * 获取用户信息（待完善）并注册
     */
    getUserInfoWithOpenId = (openId) => {
        wreq.request({
            url: '/getUserInfo',
            method: 'GET',
            data: {
                openId: openId,
            }
        }).then(res => {
            console.log(res.data);
            
        });
    }

    /**
     * 注册
     */
    register = (openId, userInfo) => {
        console.log(this.openId);
        wreq.request({
            url: `${config.server.host}/user/account/register`,
            method: 'POST',
            data: {
                openId: openId,
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl
            }
        }).then(res => {
            console.log(res.data);
            Taro.reLaunch({
                url: '/pages/index/index'
              });
        });
    }

    render() {
        return (
            <View className='auth'>
                <View className='logo'>
                    <Image className='item' src={logo} />
                </View>
                <View className='content'>
                    <View>申请获取以下权限</View>
                    <Text>
                        获取你的公开信息（昵称、头像等）
                    </Text>
                </View>
                <View className='button'>
                    <Button openType='getUserInfo' type='primary' lang='zh_CN' onGetUserInfo={this.bindGetUserInfo.bind(this)}>
                        授权登录
                    </Button>
                </View>
            </View>
        );
    }
}
