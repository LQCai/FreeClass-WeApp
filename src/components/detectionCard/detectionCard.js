import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './detectionCard.scss';
import { AtIcon } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import config from '../../config';
import { collect, collectCancel } from '../../actions/detection';


@connect(({ detection }) => ({
    detection
}), (dispatch) => bindActionCreators({
    collect,
    collectCancel
}, dispatch))
export default class DetectionCard extends Taro.Component {

    componentWillMount() {
        this.setState({
            id: this.props.uid,
            name: this.props.name,
            content: this.props.content,
            images: this.props.images,
            star: this.props.star,
            time: this.props.time,
            commentList: this.props.commentList
        })
    }

    componentDidShow() {
        this.setState({
            id: this.props.uid,
            name: this.props.name,
            content: this.props.content,
            images: this.props.images,
            star: this.props.star,
            time: this.props.time,
            commentList: this.props.commentList
        })
    }

    collect() {
        if (this.state.star == 1) {
            this.props.collect(this.state.id);
        } else {
            this.props.collectCancel(this.state.id);
        }
    }

    comment() {
        Taro.navigateTo({
            url: '/pages/detectionComment/detectionComment?articleId=' + this.state.id
        });
    }

    render() {
        const star1 = 1;
        const commentList = [
            {
                name: '罗钦才',
                comment: '哈哈哈！！'
            },
            {
                name: '芹菜',
                comment: '今天做了啥？'
            },
            {
                name: '芹菜',
                comment: '今天做了啥？'
            },
            {
                name: '芹菜',
                comment: '今天做了啥？'
            }
        ]
        return (
            <View className='detection'>
                <View>
                    <Text className='name'>
                        {this.state.name}
                    </Text>
                </View>
                <View className='content'>
                    {this.state.comment}
                </View>
                <View>
                    {this.state.images.map((image, index) => (
                        <Image className='list-img' key={index} src={image} />
                    ))}
                </View>
                <View className='other'>
                    <Text className='time-text'>
                        {this.state.time}
                    </Text>
                    <View className='collect' onClick={this.collect}>
                        {star1 == 1
                            ?
                            <AtIcon value='star-2' />
                            :
                            <AtIcon value='star' />
                        }
                    </View>
                    <View className='comment-action' onClick={this.comment}>
                        <AtIcon value='message' />
                    </View>
                </View>
                <View className='comment'>
                    <View className='comment-list'>
                        {commentList.map((commentInfo, index) => (
                            <View key={index}>
                                <Text>{commentInfo.name + ' : '} </Text>
                                <Text>{commentInfo.comment}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        );
    }
}
