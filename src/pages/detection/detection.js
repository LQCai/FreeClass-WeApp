import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './detection.scss'
import DetectionCard from '../../components/detectionCard/detectionCard';
import { AtButton } from 'taro-ui';

export default class Detection extends Taro.Component {
    componentWillMount() {
        this.setState({
            userId: Taro.getStorageSync('userInfo').id
        });
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

    render() {
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
        return (
            <View>
                <AtButton
                    size='normal'
                    type='primary'
                    className='button'
                    onClick={this.postDetection}
                >发布动态</AtButton>
                {list.map((item, index) => (
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
            </View>
        );
    }
}
