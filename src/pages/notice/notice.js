import Taro, { render } from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import { AtCard } from "taro-ui";
import CardContent from "../../components/cardContent/cardContent";

export default class Notice extends Taro.Component {
  render() {
    return (
      <View>
        <CardContent />
      </View>
    );
  }
}
