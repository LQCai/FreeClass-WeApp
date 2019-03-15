import Taro from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import { AtCard } from "taro-ui";
import "./classroomCard.scss";

export default class ClassroomCard extends Taro.Component {
  onClick(e) {
    console.log(e)
  }
  render() {
    return (
      <View className="homeWork">
        <AtCard
          title={this.props.title}
          onClick={this.onClick.bind(this, "id")}
        >
          {this.props.content}
        </AtCard>
      </View>
    );
  }
}
