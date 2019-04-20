import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem, Button, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { AtTabs, AtTabsPane, AtActionSheet, AtActionSheetItem, AtIcon, AtCard, AtModal, AtModalContent } from 'taro-ui';

import './index.scss';
import { close, open, showClassItem, closeClassItem } from '../../actions/classMenu';
import '../../actions/judgeRole';
import wreq from '../../utils/request';
import config from '../../config';
import { getOpenData, getUserInfo, userLogin } from '../../actions/user';
import { getClassList } from '../../actions/classInfo';

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
      modalState: false,
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
      modalState: true
    });
    console.log(this.state);
  }
  closeModal() {
    this.setState({
      modalState: false
    });
    console.log(this.state);
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
              Taro.showToast({
                'title': '登录成功',
                'icon': 'success'
              });
              Taro.setStorageSync('userInfo', this.props.userInfo.data);
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

  render() {
    //课堂actionSheet的状态
    let { classItemInfo, showClassItem, closeClassItem } = this.props;
    const images = [
      'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
      'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
      'http://pic.to8to.com/case/2016/09/10/20160910160945-78193f1e.jpg'
    ];

    const myTeachingClassList = this.props.classList.myTeachingClassList;
    const myStudyingClassList = this.props.classList.myStudyingClassList;

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
                      <View className='menu' onClick={this.props.showClassItem.bind(this, classInfo.id, config.role.teacher)}>
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
        <AtActionSheet
          isOpened={classItemInfo.isOpen}
          cancelText='取消'
          onCancel={closeClassItem}
          onClose={closeClassItem}>

          {classItemInfo.item.map((aasItem, index) => (
            <AtActionSheetItem key={index}>
              {aasItem.name}
            </AtActionSheetItem>
          ))}
        </AtActionSheet>
        <AtModal className='modal'
          isOpened={this.state.modalState}
          onClose={this.closeModal}
          onCancel={this.closeModal}
        >
          <View onClick={this.navigateToCreate.bind(this)}>
            <AtModalContent className='modal-item'>创建课堂</AtModalContent>
          </View>
          <View className='modal-line'></View>
          <View onClick={this.navigateToJoin.bind(this)}>
            <AtModalContent className='modal-item' >加入课堂</AtModalContent>
          </View>
        </AtModal>
      </View>
    )
  }
}

export default Index;

