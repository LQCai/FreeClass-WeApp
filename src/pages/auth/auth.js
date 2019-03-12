import Taro from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import logo from '../../asset/freeClass.png';
import './auth.scss';

export default class Auth extends Taro.Component {
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
                    <Button openType='getUserInfo'>授权登录</Button>
                </View>
            </View>
        );
    }
}
