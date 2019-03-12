import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import logo from '../../asset/freeClass.png';
import './auth.scss';
import wreq from '../../utils/request';


export default class Auth extends Taro.Component {

    /**
     * 判断用户是否授权，
     * 授权后获取用户信息
     */
    bindGetUserInfo = (e) => {
        console.log(e);
        if (e.detail.userInfo) {
            Taro.login().then(res => {
                const code = res.code;
                const openId = this.getOpenId(code);
                this.getUserInfoWithOpenId(openId);
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
            url: '/getOpenID',
            method: 'POST',
            data: {
                code: code,
            }
        }).then(res => {
            console.log(res.data);
        });
    }

    /**
     * 获取用户信息（待完善）
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
