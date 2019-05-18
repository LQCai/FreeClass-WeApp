import Taro from '@tarojs/taro';
import { ScrollView, View, Text } from '@tarojs/components';
import './detectionCollect.scss'
import DetectionCard from '../../components/detectionCard/detectionCard';
import { AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { getDetectionCollectList } from '../../actions/detection';

@connect(({ detection }) => ({
    detection
}), (dispatch) => bindActionCreators({
    getDetectionCollectList
}, dispatch))
export default class DetectionCollect extends Taro.Component {
    config = {
        navigationBarTitleText: '我的收藏',
        enablePullDownRefresh: true,
        backgroundTextStyle: 'dark'
    }

    componentWillMount() {
        this.updateList();
    }

    componentDidShow() {
        this.updateList();
    }

    updateList() {
        this.props.getDetectionCollectList().then(() => {
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <View>
                {this.props.detection.detectionCollectList.length == 0
                    ?
                    <View className='text'><Text>暂时没有关注的动态...</Text></View>
                    :
                    this.props.detection.detectionCollectList.map((item) => (
                        <View
                            key={item.id}>
                            <View
                                className='item'>
                                <DetectionCard
                                    uid={item.id}
                                    name={item.name}
                                    content={item.content}
                                    images={item.images}
                                    time={item.createTime}
                                    commentList={item.commentList}
                                    type={2}
                                />
                            </View>
                            <View className='line'></View>
                        </View>
                    ))}
            </View>
        );
    }
}
