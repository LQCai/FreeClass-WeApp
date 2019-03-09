import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import './index.scss';
import ClassCard from '../../components/classCard/ClassCard';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { close } from '../../actions/classMenu';
class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      isOpened: false,
    }
  }

  @connect(({ classMenu }) => ({
    classMenu,
  }), (dispatch) => bindActionCreators({
    close,
  }, dispatch))

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  tabClick(index) {
    this.setState({
      current: index
    })
  }

  render() {
    let actions = ['退出教室'];
    if(this.role == 1){
      actions=['编辑班级', '删除班级', '归档班级']
    }

    const images = [
      'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
      'http://gooju.cn/simages/783845_mark.jpg',
      'http://pic.to8to.com/case/2016/09/10/20160910160945-78193f1e.jpg'
    ];

    const classList = [
      {
        name: 'Taro小课堂',
        peopleCount: '10',
        role: 2,
        teacherName: '教师: lqcai',
        code: 'ZZNJX9'
      },
      {
        name: 'fitness',
        peopleCount: '20',
        role: 1,
        code: 'SXW4W2'
      },
    ];

    const tabList = [{ title: '我听的课' }, { title: '我教的课' }];

    return (
      <View className='index'>
        <Swiper indicatorDots autoplay circular className='swiper'>
          {images.map((img, index) => (
            <SwiperItem key={index}>
              <Image className='swiper-image' src={img} />
            </SwiperItem>
          ))}
        </Swiper>
        <View>
          <AtTabs className='at-tab' current={this.state.current} tabList={tabList} onClick={this.tabClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} className='at-tabs__item' >
              <View className='class-list'>
                {classList.map((course, index) => (
                  <ClassCard key={index}
                    peopleCount={course.peopleCount}
                    name={course.name}
                    role={course.role}
                    teacherName={course.teacherName}
                    code={course.code}
                  />
                ))}
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1} className='at-tabs__item' >
              <View className='class-list'>
                {classList.map((course, index) => (
                  <ClassCard key={index}
                    peopleCount={course.peopleCount}
                    name={course.name}
                    role={course.role}
                    teacherName={course.teacherName}
                    code={course.code}
                  />
                ))}
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
        <AtActionSheet
          isOpened={true}
          cancelText='取消'
          onCancel={this.props.close}
          onClose={this.props.close}>
          {actions.map((menu, index) => (
            <AtActionSheetItem key={index}>
              {menu}
            </AtActionSheetItem>
          ))}
        </AtActionSheet>
      </View>
    )
  }
}

export default Index;

