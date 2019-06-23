import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './announce.scss'
import PushItem from '../pushItem/pushItem';
import config from '../../config';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { getAnnounceList } from '../../actions/announce';
import { AtCard, AtIcon } from 'taro-ui';
import { showAnnounceItem } from '../../actions/classMenu';


@connect(({ announce }) => ({
    announce
}), (dispatch) => bindActionCreators({
    getAnnounceList,
    showAnnounceItem
}, dispatch))
export default class Announce extends Taro.Component {

    constructor() {
        this.state = {
            userId: Taro.getStorageSync("userInfo").id,
            sheet: false
        };
    }

    componentDidShow() {
        this.props.getAnnounceList(this.props.classId);

    }

    toPostAnnounce() {
        Taro.navigateTo({
            url: '/pages/postAnnounce/postAnnounce?'
                + 'classId=' + this.props.classId
                + '&userId=' + this.state.userId
        });
    }

    closeSheet() {
        this.setState({
            sheet: false
        });
    }

    openSheet() {
        this.setState({
            sheet: true
        });
    }


    showAnnounceDetail(announce, role) {
        Taro.navigateTo({
            url: '/pages/announceDetail/announceDetail?'
                + 'classId=' + this.props.classId
                + '&id=' + announce.id
                + '&role=' + role
                + '&userId=' + this.state.userId
                + '&title=' + announce.title
                + '&content=' + announce.content
                + '&annexUrl=' + announce.annexUrl
                + '&created=' +announce.created
        })
    }

    render() {
        const role = this.props.role;

        return (
            < View >
                <View onClick={this.toPostAnnounce}>
                    <PushItem
                        role={role}
                        action={config.action.announcement}
                    />
                </View>
                <View>
                    {
                        this.props.announce.announceList.length > 0
                            ?
                            this.props.announce.announceList.map((announceInfo) => (
                                <View
                                    className='card'
                                    key={announceInfo.id}>
                                    <View
                                        onClick={this.showAnnounceDetail.bind(this, announceInfo, role)}>
                                        <AtCard
                                            title={announceInfo.title}
                                        >
                                            <View>{announceInfo.content.substr(0, 30) + '...'}</View>
                                        </AtCard>
                                    </View>
                                    <View className='time'><Text>{announceInfo.created}</Text></View>
                                    <View
                                        onClick={this.props.showAnnounceItem.bind(this, announceInfo, role)}
                                        className='menu'>
                                        <AtIcon value='menu' />
                                    </View>
                                </View>
                            ))
                            :
                            role == config.role.teacher
                                ?
                                <View className='text'><Text>您还未发布过公告...</Text></View>
                                :
                                <View className='text'><Text>暂无公告...</Text></View>
                    }
                </View>
            </View >
        );
    }
}
