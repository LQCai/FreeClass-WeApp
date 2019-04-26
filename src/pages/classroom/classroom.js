import Taro from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import {
  AtAvatar,
  AtButton,
  AtTabs,
  AtTabsPane,
  AtActionSheet,
  AtActionSheetItem,
  AtModal
} from "taro-ui";
import "./classroom.scss";
import ClassroomTask from "../../components/classroomTask/classroomTask";
import ClassroomCard from "../../components/classroomCard/classroomCard";
import PushItem from '../../components/pushItem/pushItem';
import config from '../../config';
import Homework from '../../components/homework/homework';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { showHomeworkItem, closeHomeworkItem, showAnnounceItem, closeAnnounceItem } from '../../actions/classMenu';
import { deleteAnnounce, getAnnounceList } from '../../actions/announce';
import moment from 'moment';
import Attendance from "../../components/attendance/attendance";
import Announce from "../../components/announce/announce";

@connect(({ classMenu }) => ({
  homeworkItemInfo: classMenu.homeworkItemInfo,
  announceItemInfo: classMenu.announceItemInfo
}), (dispatch) => bindActionCreators({
  showHomeworkItem,
  deleteAnnounce,
  showAnnounceItem,
  closeAnnounceItem,
  closeHomeworkItem,
  getAnnounceList
}, dispatch))
export default class Classroom extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      userId: '',
      itemHomeworkInfo: {
        modal: false,
        homework: {
          id: '',
          name: ''
        }
      },
      itemAnnounceInfo: {
        modal: false,
        announce: {
          id: '',
          title: ''
        }
      }
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

  /**
   * 跳转编辑作业界面
   */
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

  /**
   * 提交删除作业
   */
  deleteHomework() {
    const deleteData = {
      id: this.state.itemHomeworkInfo.homework.id,
      teacherId: this.state.userId,
      classId: this.$router.params.classId
    }

    this.props.deleteHomework(deleteData).then(() => {
      Taro.showToast({
        title: '删除成功',
        icon: 'none'
      }).then(() => {
        this.closehomeworkModal();
        this.props.getHomeworkList(this.$router.params.classId);
      });
    }).catch((e) => {
      console.log(e);
    })
  }

  /**
   * 显示删除作业模态框
   * @param {*} homeworkInfo 
   */
  showhomeworkModal(homeworkInfo) {
    this.props.closeHomeworkItem();
    this.setState({
      itemHomeworkInfo: {
        modal: true,
        homework: homeworkInfo
      }
    });
  }

  /**
   * 关闭删除作业模态框
   */
  closehomeworkModal() {
    this.setState({
      itemHomeworkInfo: {
        modal: false,
        homework: {
          id: '',
          name: ''
        }
      }
    });
  }


  /**
   * 提交删除公告
   */
  deleteAnnounce() {
    const deleteData = {
      id: this.state.itemAnnounceInfo.announce.id,
      teacherId: this.state.userId,
      classId: this.$router.params.classId
    }

    this.props.deleteAnnounce(deleteData).then(() => {
      Taro.showToast({
        title: '删除成功',
        icon: 'none'
      }).then(() => {
        this.closeAnnounceModal();
        this.props.getAnnounceList(this.$router.params.classId);
      });
    }).catch((e) => {
      console.log(e);
    })
  }

  /**
   * 跳转编辑公告界面
   */
  editAnnounce() {
    const announceInfo = this.props.announceItemInfo.announceInfo;
    const teacherId = this.state.userId;
    const classId = this.$router.params.classId;

    Taro.navigateTo({
      url: '/pages/editAnnounce/editAnnounce?id=' + announceInfo.id
        + '&title=' + announceInfo.title
        + '&annexUrl=' + announceInfo.annexUrl
        + '&content=' + announceInfo.content
        + '&teacherId=' + teacherId
        + '&classId=' + classId
    });
  }

  /**
   * 显示删除公告模态框
   * @param {*} announceInfo 
   */
  showAnnounceModal(announceInfo) {
    this.props.closeAnnounceItem();
    this.setState({
      itemAnnounceInfo: {
        modal: true,
        announce: announceInfo
      }
    });
  }

  /**
   * 关闭删除公告模态框
   */
  closeAnnounceModal() {
    this.setState({
      itemAnnounceInfo: {
        modal: false,
        announce: {
          id: '',
          title: ''
        }
      }
    });
  }



  render() {
    const tabList = [{ title: "作业" }, { title: "公告" }, { title: "考勤" }];
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
            {/* 公告 */}
            <AtTabsPane current={this.state.current} index={1}>
              <View className="background">
                <Announce
                  role={role}
                  classId={classId}
                />
              </View>
            </AtTabsPane>
            {/* 考勤 */}
            <AtTabsPane current={this.state.current} index={2}>
              <View className="background">
                <Attendance
                  classId={classId}
                  role={role}
                />
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
        {/* 编辑作业模态框 */}
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
            <View onClick={this.showhomeworkModal.bind(this, this.props.homeworkItemInfo.homeworkInfo)}>
              <AtActionSheetItem>
                删除作业
                        </AtActionSheetItem>
            </View>
          </AtActionSheet>
        </View>
        {/* 删除作业模态框 */}
        <View>
          <AtModal
            className='modal'
            content={`确认删除 "` + this.state.itemHomeworkInfo.homework.name + `" ?`}
            cancelText='取消'
            confirmText='确认'
            isOpened={this.state.itemHomeworkInfo.modal}
            onClose={this.closehomeworkModal}
            onCancel={this.closehomeworkModal}
            onConfirm={this.deleteHomework}
          />
        </View>
        {/* 编辑公告弹出框 */}
        <View>
          <AtActionSheet
            isOpened={this.props.announceItemInfo.sheet}
            cancelText='取消'
            onCancel={this.props.closeAnnounceItem}
            onClose={this.props.closeAnnounceItem}>

            <View onClick={this.editAnnounce}>
              <AtActionSheetItem>
                编辑公告
                        </AtActionSheetItem>
            </View>
            <View onClick={this.showAnnounceModal.bind(this, this.props.announceItemInfo.announceInfo)}>
              <AtActionSheetItem>
                删除公告
                        </AtActionSheetItem>
            </View>
          </AtActionSheet>
        </View>
        {/* 删除公告模态框 */}
        <View>
          <AtModal
            className='modal'
            content={`确认删除 "` + this.state.itemAnnounceInfo.announce.title + `" ?`}
            cancelText='取消'
            confirmText='确认'
            isOpened={this.state.itemAnnounceInfo.modal}
            onClose={this.closeAnnounceModal}
            onCancel={this.closeAnnounceModal}
            onConfirm={this.deleteAnnounce}
          />
        </View>
      </View>
    );
  }
}
