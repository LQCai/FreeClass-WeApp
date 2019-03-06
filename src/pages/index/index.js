import Taro, { Component } from '@tarojs/taro';
import { View, Swiper, SwiperItem } from '@tarojs/components';
import { AtCard } from 'taro-ui';
import './index.scss';

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
          <AtCard
            note='10人'
            title='Taro小课堂'
            thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
          >邀请码：  ZZNJX9</AtCard>
        </View>
      </View>
    )
  }
}

export default Index;

