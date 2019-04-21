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
import ClassroomTask from "../../components/classroomTask/classroomTask";
import ClassroomCard from "../../components/classroomCard/classroomCard";
import PushItem from '../../components/pushItem/pushItem';
import config from '../../config';

export default class Classroom extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }


  componentDidShow() {
    console.log(this.$router.params);
  }


  handleClick(value) {
    this.setState({
      current: value
    });
  }
  onClick(e) {
    if (e == "id") {
      console.log(e);
    } else {
      console.log(e);
    }
  }



  render() {
    const tabList = [{ title: "作业" }, { title: "资料" }, { title: "公告" }, { title: "考勤" }];
    const classId = this.$router.params.classId;
    const role = this.$router.params.role;

    return (
      <AtTabs
        current={this.state.current}
        tabList={tabList}
        onClick={this.handleClick.bind(this)}
        swipeable={false}
      >
        <AtTabsPane current={this.state.current} index={0}>
          <View>
            <PushItem
              role={role}
              action={config.action.homework}
            />
            <ClassroomTask
              classId={classId}
              role={role}
            />
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View className="background">
            <PushItem
              role={role}
              action={config.action.material}
            />
            <ClassroomCard
              title="寒假放学通知"
              content="在寒假期间哈哈哈哈哈哈哈哈哈哈哈哈嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿"
              notes="发布人：张温兴 发布时间：03月15日 16:34"
            />
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View className="background">
            <PushItem
              role={role}
              action={config.action.announcement}
            />
            <ClassroomCard
              title="寒假放学通知"
              content="在寒假期间哈哈哈哈哈哈哈哈哈哈哈哈嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿"
              notes="发布人：张温兴 发布时间：03月15日 16:34"
            />
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3}>
          <View className="background">
            <PushItem
              role={role}
              action={config.action.attendance}
            />
            <ClassroomCard
              title="寒假放学通知"
              content="在寒假期间哈哈哈哈哈哈哈哈哈哈哈哈嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿"
              notes="发布人：张温兴 发布时间：03月15日 16:34"
            />
          </View>
        </AtTabsPane>
      </AtTabs>
    );
  }
}
