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
import { getClassList, deleteClass, quitClass } from '../../actions/classInfo';

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
  deleteClass,
  quitClass
}, dispatch))

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
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
      deleteClassName: '',
      quitModalState: false,
      quitClassId: '',
      quitClassName: ''
    });
  }

  componentDidShow() {
    this.checkUserInfo();
    this.props.getClassList(this.state.userInfo.id);
  }


  /**
   * 确认用户信息是否缓存，以再判定是否要登录（这里好像还没处理好）
   */
  checkUserInfo() {
    const userInfo = this.state.userInfo;
    if (Object.keys(userInfo).length == 0) {
      this.login();
    }
  }

  /**
   * 显示创建\加入模态框
   */
  showModal() {
    this.setState({
      addModalState: true
    });
    console.log(this.state);
  }

  /**
   * 关闭创建\加入模态框
   */
  closeModal() {
    this.setState({
      addModalState: false
    });
    console.log(this.state);
  }

  /**
   * 控制删除确认模态框显示
   * @param {*} classId 
   * @param {*} className 
   */
  showDeleteModal(classId, className) {
    this.setState({
      deleteModalState: true,
      deleteClassId: classId,
      deleteClassName: className
    });
  }

  /**
   * 控制删除确认模态框关闭
   */
  closeDeleteModal() {
    this.setState({
      deleteModalState: false
    });
  }

  /**
 * 控制退出确认模态框显示
 * @param {*} classId 
 * @param {*} className 
 */
  showQuitModal(classId, className) {
    this.setState({
      quitModalState: true,
      quitClassId: classId,
      quitClassName: className
    });
  }

  /**
   * 控制退出确认模态框关闭
   */
  closeQuitModal() {
    this.setState({
      quitModalState: false
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

  /**
   * 跳转指定课堂详细页面
   * @param {*} classId 
   * @param {*} role 
   */
  showClassDetail(classId, role) {
    Taro.navigateTo({
      url: "/pages/classroom/classroom?"
        + "classId=" + classId
        + "&role=" + role
    });
  }

  /**
   * 跳转加入课堂页面
   */
  navigateToJoin() {
    this.closeModal();
    Taro.navigateTo({
      url: "/pages/joinClass/joinClass"
    });
  }

  /**
   * 跳转创建课堂页面
   */
  navigateToCreate() {
    this.closeModal();
    Taro.navigateTo({
      url: "/pages/createClass/createClass"
    });
  }

  /**
   * 指定课堂弹出事件
   * @param {*} index 
   * @param {*} role 
   */
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
        console.log(classInfo);
        this.showQuitModal(classInfo.id, classInfo.name);
        this.props.closeClassItem();
      }
    } else {
      Taro.showToast({
        title: '异常',
        icon: 'none',
        duration: 2000
      })
    }
  }

  /**
   * 提交删除课堂
   */
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

  /**
   * 提交退出课堂
   */
  submitQuit() {
    this.props.quitClass(this.state.userInfo.id, this.state.quitClassId).then(() => {
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
    let { classItemInfo, showClassItem, closeClassItem } = this.props;
    const images = [
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=168883838,1751966121&fm=26&gp=0.jpg',
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=54792967,3662211541&fm=26&gp=0.jpg'
    ];

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
                  this.props.classList.myTeachingClassList.length > 0
                    ?
                    this.props.classList.myTeachingClassList.map((classInfo) => (
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
                    :
                    <View className='text'><Text>您还未创建课堂,点击右侧 "+" 创建吧...</Text></View>
                }
              </View>
            </AtTabsPane>

            {/* 我听的课 */}
            <AtTabsPane current={this.state.current} index={1} className='at-tabs__item' >
              <View className='class-list'>
                {
                  this.props.classList.myStudyingClassList.length > 0
                    ?
                    this.props.classList.myStudyingClassList.map((classInfo) => (
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
                        <View className='menu' onClick={this.props.showClassItem.bind(this, classInfo, config.role.student)}>
                          <AtIcon value='menu' />
                        </View>
                      </View>
                    ))
                    :
                    <View className='text'><Text>您还未加入任何课堂,点击右侧 "+" 加入吧...</Text></View>
                }
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

        {/* 退出课堂模态框 */}
        <View>
          <AtModal
            className='modal'
            content={`确认退出` + this.state.quitClassName + `?`}
            cancelText='取消'
            confirmText='确认'
            isOpened={this.state.quitModalState}
            onClose={this.closeQuitModal}
            onCancel={this.closeQuitModal}
            onConfirm={this.submitQuit}
          />
        </View>
      </View>
    )
  }
}

export default Index;

