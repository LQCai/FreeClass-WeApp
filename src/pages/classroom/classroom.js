import Taro from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import {
  AtAvatar,
  AtButton,
  AtTabs,
  AtTabsPane,
  AtList,
  AtListItem
} from "taro-ui";
import "./classroom.scss";
import ClassroomTask from "../classroom/classroomTask/classroomTask";
import ClassroomCard from "../classroom/classroomCard/classroomCard";
import resources from "../../asset/classroom/resources.png";
import link from "../../asset/classroom/link.png";

export default class Classroom extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }
  handleClick(value) {
    this.setState({
      current: value
    });
  }
  onClick(e){
  if(e=='id'){
    console.log(e)
  }else{
    console.log(e)
  }
  }
  render() {
    const tabList = [{ title: "作业" }, { title: "资料" }, { title: "公告" }];
    return (
      <AtTabs
        current={this.state.current}
        tabList={tabList}
        onClick={this.handleClick.bind(this)}
        swipeable={false}
      >
        <AtTabsPane current={this.state.current} index={0}>
          <View>
            <ClassroomTask />
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View className='background'>
            <View className="data">
              <AtList>
                <AtListItem title="课堂资源" arrow="right" thumb={resources} onClick={this.onClick.bind(this,'id')}/>
                <AtListItem title="外链资源" arrow="right" thumb={link} onClick={this.onClick.bind(this,'id2')}/>
              </AtList>
            </View>
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View className='background'>
          <ClassroomCard title='寒假放学通知' content='在寒假期间'/>
          </View>
        </AtTabsPane>
      </AtTabs>
    );
  }
}
