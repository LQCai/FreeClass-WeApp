import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { AtTabs, AtTabsPane, AtActionSheet, AtActionSheetItem, AtIcon, AtCard, AtModal, AtModalHeader } from 'taro-ui';

import './index.scss';
import { close, open, showClassItem, closeClassItem } from '../../actions/classMenu';
import '../../actions/judgeRole';
import wreq from '../../utils/request';
import config from '../../config';
import { getOpenData, getUserInfo, userLogin } from '../../actions/user';
import { getClassList, deleteClass } from '../../actions/classInfo';

@connect(({ classMenu, user, classInfo }) => ({
  classMenu: classMenu.isOpen,
  classItemInfo: classMenu.classItemInfo,
  openData: user.openData,
  userInfo: user.userInfo,
  classList: classInfo.classList,
}), (dispatch) => bindActionCreators({
  close,
  open,
  showClassItem,
  closeClassItem,
  getUserInfo,
  getOpenData,
  userLogin,
  getClassList,
  deleteClass
}, dispatch))

class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
  }

  constructor() {
    super(...arguments)
    this.setState({
      userInfo: Taro.getStorageSync("userInfo"),
      current: 0,
      classItem: {
        isOpen: false,
        classId: '',
        type: ''
      },
      addModalState: false,
      deleteModalState: false,
      deleteClassId: '',
      deleteClassName: ''
    });
  }

  componentDidShow() {
    this.checkUserInfo();
    this.props.getClassList(this.state.userInfo.id);
  }


  checkUserInfo() {
    const userInfo = this.state.userInfo;
    if (Object.keys(userInfo).length == 0) {
      this.login();
    }
  }

  showModal() {
    this.setState({
      addModalState: true
    });
    console.log(this.state);
  }
  closeModal() {
    this.setState({
      addModalState: false
    });
    console.log(this.state);
  }

  showDeleteModal(classId, className) {
    this.setState({
      deleteModalState: true,
      deleteClassId: classId,
      deleteClassName: className
    });
  }
  closeDeleteModal() {
    this.setState({
      deleteModalState: false
    });
  }


  /**
   * 
   * 请求登录
   * (详见用例图)
   * 
   */
  login() {

    const { getOpenData, getUserInfo } = this.props;

    //判断是否已授权
    Taro.getSetting().then(res => {
      if (!res.authSetting['scope.userInfo']) {
        Taro.reLaunch({
          url: '/pages/auth/auth'
        });
      } else {
        getOpenData().catch((e) => {
          console.log(e);
        }).then(() => {
          let { openData } = this.props;

          if (openData.code != config.code.success) {
            Taro.reLaunch({
              url: '/pages/auth/auth'
            });
          } else {
            getUserInfo(openData.openId).catch((e) => {
              console.log(e);
            }).then(() => {
              Taro.setStorage({
                key: 'userInfo',
                data: this.props.userInfo.data
              }).then(() => {
                // Taro.showToast({
                //   'title': '登录成功',
                //   'icon': 'success'
                // });
              });
            });
          }
        });
      }
    });
  }

  tabClick(index) {
    this.setState({
      current: index
    })
  }

  showClassDetail(ClassId, role) {
    Taro.navigateTo({
      url: "/pages/classroom/classroom?"
        + "classId=" + ClassId + "$role" + role
    });
  }

  navigateToJoin() {
    this.closeModal();
    Taro.navigateTo({
      url: "/pages/joinClass/joinClass"
    });
  }

  navigateToCreate() {
    this.closeModal();
    Taro.navigateTo({
      url: "/pages/createClass/createClass"
    });
  }

  classItemEvent(index, role) {
    const classInfo = this.props.classItemInfo.classInfo;
    if (role == config.role.teacher) {
      // 编辑课堂
      if (index == 0) {
        this.props.closeClassItem();
        Taro.navigateTo({
          url: '/pages/classEdit/classEdit?'
            + 'classId=' + classInfo.id
            + '&className=' + classInfo.name
            + '&topping=' + classInfo.topping
        });
        // 删除课堂
      } else if (index == 1) {
        this.showDeleteModal(classInfo.id, classInfo.name);
        console.log(classInfo);
        this.props.closeClassItem();
      }
    } else if (role == config.role.student) {
      // 退出课堂
      if (index == 0) {

      }
    } else {
      Taro.showToast({
        title: '异常',
        icon: 'none',
        duration: 2000
      })
    }
  }

  submitDelete() {
    this.props.deleteClass(this.state.userInfo.id, this.state.deleteClassId, this.state.deleteClassName).then(() => {
      Taro.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      }).then(() => {
        Taro.reLaunch({
          url: '/pages/index/index'
        });
      });
    }).catch((e) => {
      console.log(e);
    })
  }

  render() {
    //课堂actionSheet的状态
    let { classItemInfo, showClassItem, closeClassItem, classList, deleteClass } = this.props;
    const images = [
      'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
      'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
      'http://pic.to8to.com/case/2016/09/10/20160910160945-78193f1e.jpg'
    ];

    const myTeachingClassList = classList.myTeachingClassList;
    const myStudyingClassList = classList.myStudyingClassList;

    const tabList = [{ title: '我教的课' }, { title: '我听的课' }];

    return (
      <View className='index'>
        <Swiper indicatorDots autoplay circular className='swiper'>
          {images.map((img, index) => (
            <SwiperItem key={index}>
              <Image className='swiper-image' src={img} />
            </SwiperItem>
          ))}
        </Swiper>
        <View className='class-list-pane'>
          <View className='class-control' onClick={this.showModal}>
            <AtIcon value='add' size='20' color='#6190E8' />
          </View>
          <AtTabs className='at-tab' current={this.state.current} tabList={tabList} onClick={this.tabClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} className='at-tabs__item' >

              {/* 我教的课 */}
              <View className='class-list'>
                {
                  (myTeachingClassList || []).map((classInfo) => (
                    <View className='class-card' key={classInfo.id}>
                      <AtCard onClick={this.showClassDetail.bind(this, classInfo.id, config.role.teacher)}
                        note={classInfo.peopleCount + '人'}
                        title={classInfo.name}
                      >
                        {'角色:' + '   教师'}
                      </AtCard>
                      <Text className='code'>
                        {classInfo.invitationCode}
                      </Text>
                      <View className='menu' onClick={this.props.showClassItem.bind(this, classInfo, config.role.teacher)}>
                        <AtIcon value='menu' />
                      </View>
                    </View>
                  ))
                }
              </View>
            </AtTabsPane>

            {/* 我听的课 */}
            <AtTabsPane current={this.state.current} index={1} className='at-tabs__item' >
              <View className='class-list'>
                {(myStudyingClassList || []).map((classInfo) => (
                  <View className='class-card' key={classInfo.id}>
                    <AtCard onClick={this.showClassDetail.bind(this, classInfo.id, config.role.student)}
                      note={classInfo.peopleCount + '人'}
                      title={classInfo.name}
                    >
                      {'角色:' + '   学生' + '   姓名:' + classInfo.teacherName}
                    </AtCard>
                    <Text className='code'>
                      {classInfo.invitationCode}
                    </Text>
                    <View className='menu' onClick={this.props.showClassItem.bind(this, classInfo.id, config.role.student)}>
                      <AtIcon value='menu' />
                    </View>
                  </View>
                ))}
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>

        {/* 课堂弹出的菜单 */}
        <AtActionSheet
          isOpened={classItemInfo.isOpen}
          cancelText='取消'
          onCancel={closeClassItem}
          onClose={closeClassItem}>

          {classItemInfo.item.map((aasItem, index) => (
            <View key={index} onClick={this.classItemEvent.bind(this, index, classItemInfo.role)}>
              <AtActionSheetItem>
                {aasItem.name}
              </AtActionSheetItem>
            </View>
          ))}
        </AtActionSheet>

        {/* 创建/加入课堂模态框 */}
        <AtModal className='modal'
          isOpened={this.state.addModalState}
          onClose={this.closeModal}
          onCancel={this.closeModal}
        >
          <View onClick={this.navigateToCreate.bind(this)}>
            <AtModalHeader className='modal-item'>创建课堂</AtModalHeader>
          </View>
          <View className='modal-line'></View>
          <View onClick={this.navigateToJoin.bind(this)}>
            <AtModalHeader className='modal-item' >加入课堂</AtModalHeader>
          </View>
        </AtModal>

        {/* 删除课堂模态框 */}
        <View>
          <AtModal
            className='modal'
            content={`确认删除` + this.state.deleteClassName + `?`}
            cancelText='取消'
            confirmText='确认'
            isOpened={this.state.deleteModalState}
            onClose={this.closeDeleteModal}
            onCancel={this.closeDeleteModal}
            onConfirm={this.submitDelete}
          />
        </View>
      </View>
    )
  }
}

export default Index;

