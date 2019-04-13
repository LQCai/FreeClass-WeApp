import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import logo from '../../asset/freeClass.png';
import './auth.scss';
import wreq from '../../utils/request';
import config from '../../config';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { submitRegister, getOpenData } from '../../actions/user';

@connect(({ user }) => ({
    openData: user.openData
}), (dispatch) => bindActionCreators({
    getOpenData,
    submitRegister
}, dispatch))
export default class Auth extends Taro.Component {

    /**
     * 判断用户是否授权，
     * 授权后获取用户信息
     */
    bindGetUserInfo = (e) => {
        //获取微信用户信息
        const wxUserInfo = e.detail.userInfo;

        if (wxUserInfo) {
            this.props.getOpenData().catch((e) => {
                console.log(e);
            }).then(() => {
                const openData = this.props.openData;
               
                console.log(openData);

                if (openData.code != config.code.success) {
                    this.props.submitRegister(openData.msg, wxUserInfo.nickName);
                } else {
                    Taro.reLaunch({
                        url: '/pages/index/index'
                    });
                }

            });
        } else {
            Taro.showToast({
                title: '请授权后登录',
                icon: 'none'
            });
        }
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
