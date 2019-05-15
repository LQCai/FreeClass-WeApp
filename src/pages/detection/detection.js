import Taro from '@tarojs/taro';
import { ScrollView, View, Text } from '@tarojs/components';
import './detection.scss'
import DetectionCard from '../../components/detectionCard/detectionCard';
import { AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { getDetectionList } from '../../actions/detection';

@connect(({ detection }) => ({
    detection
}), (dispatch) => bindActionCreators({
    getDetectionList
}, dispatch))
export default class Detection extends Taro.Component {
    config = {
        navigationBarTitleText: '动态',
        enablePullDownRefresh: true,
        backgroundTextStyle: 'dark'
    }

    constructor() {
        super(...arguments)
        this.setState({
            userId: Taro.getStorageSync('userInfo').id,
            pageIndex: 0,
            pageNextIndex: 1
        });
    }

    componentWillMount() {
        this.setState({
            articleList: []
        });
        this.updateList();
    }

    componentDidShow() {
        this.updateList();
    }


    postDetection() {
        Taro.navigateTo({
            url: '/pages/postDetection/postDetection'
        })
    }

    updateList() {
        this.props.getDetectionList(0).then(() => {
            this.setState(({
                articleList: this.props.detection.detectionList,
                pageIndex: 0,
                pageNextIndex: 1
            }))
        }).catch((e) => {
            console.log(e);
        });
    }

    appendNextPageList() {
        console.log(this.state.pageIndex);
        console.log(this.state.pageNextIndex);
        this.props.getDetectionList(this.state.pageNextIndex).then(() => {
            const list = this.props.detection.detectionList;
            if (list.length <= 0) {
                Taro.showToast({
                    title: '没有更多动态了!',
                    icon: 'none'
                });
            } else {
                this.setState({
                    articleList: this.state.articleList.concat(list),
                    pageIndex: this.state.pageIndex + 1,
                    pageNextIndex: this.state.pageNextIndex + 1
                })
            }
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
                {this.state.articleList.map((item) => (
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
                                star={item.star}
                            />
                        </View>
                        <View className='line'></View>
                    </View>
                ))}
            </ScrollView>
        );
    }
}
