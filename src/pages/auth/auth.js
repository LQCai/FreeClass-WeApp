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
        //获取微信用户信息
        const wxUserInfo = e.detail.userInfo;
        
        console.log(wxUserInfo);

        if (wxUserInfo) {
            Taro.setStorageSync('wxUserInfo', wxUserInfo);
            Taro.login().then(res => {
                const code = res.code;
                this.getOpenId(code);
            })
        }else {
            //未授权的操作
        }
    }

    /**
     * 获取openId（待完善）
     */
    getOpenId = (code) => {
        wreq.request({
            url: `${config.server.host}/user/wechat/getAuthOpenId`,
            method: 'GET',
            data: {
                code: code,
            }
        }).then(res => {
            const resData = res.data;

            if(resData.code != `${config.code.success}`) {
                const wxUserInfo = Taro.getStorageSync('wxUserInfo');
                const openId = resData.msg;
                this.register(openId, wxUserInfo);
            }else {
                Taro.reLaunch({
                    url: '/pages/index/index'
                  });
            }
        });
    }

    /**
     * 注册
     */
    register = (openId, userInfo) => {
        console.log(openId);
        console.log(userInfo);
        wreq.request({
            url: `${config.server.host}/user/account/register`,
            method: 'GET',
            data: {
                openId: openId,
                nickName: userInfo.nickName,
                avatarUrl: userInfo.avatarUrl
            }
        }).then(res => {
            const resData = res.data;

            if(resData.code == `${config.code.success}`) {
                Taro.reLaunch({
                    url: '/pages/index/index'
                  });
            }else {
                Taro.showToast("异常");
            }
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
