import Taro, { render } from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import "./personalData.scss";

export default class PersonalData extends Taro.Component {
  constructor() {
    super(...arguments);
  }
  /*跳转进入个人资料编辑页面*/
  handleClick(e,c){
    console.log("e",e,c)
  Taro.navigateTo({
    url:"../../pages/personalDataUpdate/personalDataUpdate?parameter="+e+"&content="+c
  })
  }
  render() {
    return (
      <View class="background">
        <View class="backgroundContent" />
        <AtList>
          <AtListItem
            title="姓名"
            extraText="郑君成"
            arrow="right"
            onClick={this.handleClick.bind(this,"姓名","郑君成")}
          />
          <AtListItem
            title="学号"
            extraText="1621202448"
            arrow="right"
            onClick={this.handleClick.bind(this,"学号","1621202448")}
          />
          <AtListItem
            title="学校"
            extraText="厦门理工学院"
            arrow="right"
            onClick={this.handleClick.bind(this,"学校","厦门理工学院")}
          />
          <AtListItem
            title="身份"
            extraText="学生"
            arrow="right"
            onClick={this.handleClick.bind(this,"身份","学生")}
          />
        </AtList>
        <View class="backgroundContent" />
        <AtList>
          <AtListItem
            title="专业"
            extraText="软件工程专业"
            arrow="right"
            onClick={this.handleClick.bind(this,"专业","软件工程专业")}
          />
          <AtListItem
            title="年级"
            extraText="3"
            arrow="right"
            onClick={this.handleClick.bind(this,"年级","3")}
          />
          <AtListItem
            title="班级"
            extraText="16会计信息化2班"
            arrow="right"
            onClick={this.handleClick.bind(this,"班级","16会计信息化2班")}
          />
          <AtListItem
            title="入学时间"
            extraText="2016-09"
            arrow="right"
            onClick={this.handleClick.bind(this,"入学时间","2016-09")}
          />
        </AtList>
      </View>
    );
  }
}
