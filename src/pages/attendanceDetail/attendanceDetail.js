import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './attendanceDetail.scss'

export default class AttendanceDetail extends Taro.Component {
  render() {
      console.log(this.$router.params);
    return (
      <View>
        <Text> AttendanceDetail </Text>
      </View>
    );
  }
}
