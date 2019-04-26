import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './homework.scss'
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { getHomeworkList } from '../../actions/homework';
import PushItem from '../pushItem/pushItem';
import config from '../../config';
import { AtCard, AtIcon, AtActionSheetItem, AtActionSheet } from 'taro-ui';
import { showHomeworkItem } from '../../actions/classMenu';

@connect(({ homework }) => ({
    homeworkList: homework.homeworkList
}), (dispatch) => bindActionCreators({
    getHomeworkList,
    showHomeworkItem
}, dispatch))
export default class Homework extends Taro.Component {

    constructor() {
        super(...arguments);
        this.state = {
            userId: Taro.getStorageSync("userInfo").id,
            sheet: false
        };
    }

    componentDidShow() {
        const role = this.props.role;
        const classId = this.props.classId;
        this.props.getHomeworkList(classId);
    }

    postHomework() {
        if (this.props.role == config.role.teacher) {
            Taro.navigateTo({
                url: '/pages/postHomework/postHomework?teacherId='
                    + this.state.userId
                    + '&classId='
                    + this.props.classId
            });
        }
    }

    closeSheet() {
        this.setState({
            sheet: false
        });
    }

    openSheet(homework) {
        this.setState({
            sheet: true
        });
    }

    showHomeworkDetail(homework, role) {
        Taro.navigateTo({
            url: '/pages/homeworkDetail/homeworkDetail?'
                + 'classId=' + this.props.classId
                + '&id=' + homework.id
                + '&role=' + role
                + '&userId=' + this.state.userId
                + '&name=' + homework.name
                + '&introduction=' + homework.introduction
                + '&annexUrl=' + homework.annexUrl
                + '&deadline=' + homework.deadline
        })
    }

    render() {
        const role = this.props.role;
        const homeworkList = this.props.homeworkList;

        return (
            <View >
                <View onClick={this.postHomework}>
                    <PushItem
                        role={role}
                        action={config.action.homework}
                    />
                </View>
                <View>
                    {
                        homeworkList.length > 0
                            ?
                            homeworkList.map((homework) => (
                                <View
                                    className='homeworkItem'
                                    key={homework.id}>
                                    <View
                                        onClick={this.showHomeworkDetail.bind(this, homework, role)}
                                    >
                                        <AtCard
                                            title={homework.name}
                                        >
                                            <View>{`截至：${homework.deadline}`}</View>
                                            <View>{homework.introduction.substr(0, 30) + '...'}</View>
                                        </AtCard>
                                    </View>
                                    {
                                        role == config.role.teacher
                                            ?
                                            <View className='homeworkItemMenu' onClick={this.props.showHomeworkItem.bind(this, homework, role)}>
                                                <AtIcon value='menu'></AtIcon>
                                            </View>
                                            :
                                            <View></View>
                                    }
                                </View>
                            ))
                            :
                            role == config.role.teacher
                                ?
                                <View className='text'><Text>您尚未发布作业...</Text></View>
                                :
                                <View className='text'><Text>暂无作业...</Text></View>
                    }
                </View>
            </View>
        );
    }
}
