import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';


//获取用户信息
Taro.getUserInfo().then(res =>{
  console.log(res.userInfo)
})


export default class Profile extends Taro.Component {
  render() {
    return (
      <View>
        <Text> Profile </Text>
      </View>
    );
  }
}
