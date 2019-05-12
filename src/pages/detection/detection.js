import Taro from '@tarojs/taro';
import { ScrollView, View, Text } from '@tarojs/components';
import './detection.scss'
import DetectionCard from '../../components/detectionCard/detectionCard';
import { AtButton } from 'taro-ui';

export default class Detection extends Taro.Component {
    config = {
        navigationBarTitleText: '动态',
        enablePullDownRefresh: true,
        backgroundTextStyle: 'dark'
    }
    componentWillMount() {
        this.setState({
            userId: Taro.getStorageSync('userInfo').id,
            articleList: []
        });
        this.updateList();
    }


    postDetection() {
        Taro.navigateTo({
            url: '/pages/postDetection/postDetection'
        })
    }

    showDetail() {
        Taro.navigateTo({
            url: '/pages/detectionDetail/detectionDetail'
        })
    }

    updateList() {
        console.log("up");
        this.setState({
            articleList: [
                {
                    name: '罗钦才',
                    content: '测试json',
                    images: [
                        'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
                        'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
                        'http://pic.to8to.com/case/2016/09/10/20160910160945-78193f1e.jpg'
                    ],
                    time: '2019-01-01 00:00:00'
                },
                {
                    name: '罗钦才',
                    content: '测试json',
                    images: [
                        'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
                        'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
                        'http://pic.to8to.com/case/2016/09/10/20160910160945-78193f1e.jpg'
                    ],
                    time: '2019-01-01 00:00:00'
                },
                {
                    name: '罗钦才',
                    content: '测试json',
                    images: [
                        'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
                        'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
                        'http://pic.to8to.com/case/2016/09/10/20160910160945-78193f1e.jpg'
                    ],
                    time: '2019-01-01 00:00:00'
                },
                {
                    name: '罗钦才',
                    content: '测试json',
                    images: [
                        'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
                        'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
                        'http://pic.to8to.com/case/2016/09/10/20160910160945-78193f1e.jpg'
                    ],
                    time: '2019-01-01 00:00:00'
                }
            ]
        })
    }

    appendNextPageList() {
        console.log("down");
        const list = [
            {
                name: '罗钦才',
                content: '测试json',
                images: [
                    'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
                    'http://pic.to8to.com/case/2017/10/13/20171013141744-83b8e01c.jpg',
                    'http://pic.to8to.com/case/2016/09/10/20160910160945-78193f1e.jpg'
                ],
                time: '2019-01-01 00:00:00'
            }
        ];
        this.setState({
            articleList: this.state.articleList.concat(list)
        })
    }

    render() {
        return (
            <ScrollView
                className='scroll-view'
                scrollY
                scrollWithAnimation
                scrollTop={0}
                lowerThreshold={30}
                upperThreshold={30}
                onScrollToUpper={this.updateList.bind(this)}
                onScrollToLower={this.appendNextPageList.bind(this)}
            >
                <AtButton
                    size='normal'
                    type='primary'
                    className='button'
                    onClick={this.postDetection}
                >发布动态</AtButton>
                {this.state.articleList.map((item, index) => (
                    <View
                        onClick={this.showDetail}
                        key={index}>
                        <View
                            className='item'>
                            <DetectionCard
                                name={item.name}
                                content={item.content}
                                images={item.images}
                                time={item.time}
                            />
                        </View>
                        <View className='line'></View>
                    </View>
                ))}
            </ScrollView>
        );
    }
}
