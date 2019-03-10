import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';



Taro.getUserInfo().then(res =>{
  // const userInfo = res.userInfo;
  console.log(res.userInfo)
})

Taro.login().then(res =>{
  // const userInfo = res.userInfo;
  console.log(res.code)
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
