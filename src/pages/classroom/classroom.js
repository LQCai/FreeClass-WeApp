import Taro from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import {
  AtAvatar,
  AtButton,
  AtTabs,
  AtTabsPane,
  AtActionSheet,
  AtActionSheetItem
} from "taro-ui";
import "./classroom.scss";
import ClassroomTask from "../../components/classroomTask/classroomTask";
import ClassroomCard from "../../components/classroomCard/classroomCard";
import PushItem from '../../components/pushItem/pushItem';
import config from '../../config';
import Homework from '../../components/homework/homework';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { showHomeworkItem, closeHomeworkItem } from '../../actions/classMenu';
import moment from 'moment';

@connect(({ classMenu }) => ({
  homeworkItemInfo: classMenu.homeworkItemInfo
}), (dispatch) => bindActionCreators({
  showHomeworkItem,
  closeHomeworkItem
}, dispatch))
export default class Classroom extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      userId: '',
      itemHomeworkInfo: {}
    };
  }


  componentDidShow() {
    this.setState({
      userId: Taro.getStorageSync('userInfo').id
    });
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

  editHomework() {
    const homeworkInfo = this.props.homeworkItemInfo.homeworkInfo;
    const teacherId = this.state.userId;
    const classId = this.$router.params.classId;

    const deadlineDate = moment(homeworkInfo.deadline).format('YYYY-MM-DD');
    const deadlineTime = moment(homeworkInfo.deadline).format('HH:mm:ss');
    Taro.navigateTo({
      url: '/pages/editHomework/editHomework?id=' + homeworkInfo.id
        + '&name=' + homeworkInfo.name
        + '&dateSel=' + deadlineDate
        + '&timeSel=' + deadlineTime
        + '&annexUrl=' + homeworkInfo.annexUrl
        + '&introduction=' + homeworkInfo.introduction
        + '&teacherId=' + teacherId
        + '&classId=' + classId
    });
  }



  render() {
    const tabList = [{ title: "作业" }, { title: "资料" }, { title: "公告" }, { title: "考勤" }];
    const classId = this.$router.params.classId;
    const role = this.$router.params.role;

    return (
      <View>
        <View>
          <AtTabs
            current={this.state.current}
            tabList={tabList}
            onClick={this.handleClick.bind(this)}
            swipeable={false}
          >
            {/* 作业 */}
            <AtTabsPane current={this.state.current} index={0}>
              <View>

                <Homework
                  classId={classId}
                  role={role}
                />
              </View>
            </AtTabsPane>
            {/* 资料 */}
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
            {/* 公告 */}
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
            {/* 考勤 */}
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
        </View>
        <View>
          <AtActionSheet
            isOpened={this.props.homeworkItemInfo.sheet}
            cancelText='取消'
            onCancel={this.props.closeHomeworkItem}
            onClose={this.props.closeHomeworkItem}>

            <View onClick={this.editHomework}>
              <AtActionSheetItem>
                编辑作业
                        </AtActionSheetItem>
            </View>
            <View >
              <AtActionSheetItem>
                删除作业
                        </AtActionSheetItem>
            </View>
          </AtActionSheet>
        </View>
      </View>
    );
  }
}
