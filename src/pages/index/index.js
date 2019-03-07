import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import './index.scss';
import ClassCard from '../../components/classCard/ClassCard';

class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark',
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const images = [
      'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
      'http://gooju.cn/simages/783845_mark.jpg',
      'http://pic.to8to.com/case/2016/09/10/20160910160945-78193f1e.jpg'
    ];

    const classList = [
      {
        name: 'Taro小课堂',
        peopleCount: '10',
        role: '学生    ',
        teacherName: '教师: lqcai',
        code: 'ZZNJX9'
      },
      {
        name: 'fitness',
        peopleCount: '20',
        role: '教师',
        code: 'SXW4W2'
      },
    ];

    return (
      <View className='index'>
        <Swiper indicatorDots autoplay circular className='swiper'>
          {images.map((img, index) => (
            <SwiperItem key={index}>
              <Image className='swiper-image' src={img} />
            </SwiperItem>
          ))}
        </Swiper>
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
      </View>
    )
  }
}

export default Index;

