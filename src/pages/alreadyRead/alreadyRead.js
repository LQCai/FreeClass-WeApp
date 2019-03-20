import Taro, { render } from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import { AtListItem } from "taro-ui";
import "./alreadyRead.scss";

export default class AlreadyRead extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  render() {
    return (
      <View className='background'>
        <AtListItem title="郑君成" extraText="1621202448" />
      </View>
    );
  }
}
