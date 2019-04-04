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
        note={this.props.notes}
          title={this.props.title}
          extra={this.props.extra}
          onClick={this.onClick.bind(this, "id")}
        >
        <View className="contentText">
        {this.props.content}
        </View>
        </AtCard>
      </View>
    );
  }
}
