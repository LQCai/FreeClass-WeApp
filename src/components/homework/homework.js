import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './homework.scss'
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { getHomeworkList } from '../../actions/homework';
import PushItem from '../pushItem/pushItem';
import config from '../../config';
import { AtCard, AtIcon } from 'taro-ui';

@connect(({ homework }) => ({
    homeworkList: homework.homeworkList
}), (dispatch) => bindActionCreators({
    getHomeworkList
}, dispatch))
export default class Homework extends Taro.Component {

    constructor() {
        super(...arguments);
        this.state = {
            userId: Taro.getStorageSync("userInfo").id
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
                    {homeworkList.map((homework) => (
                        <View
                        className = 'homeworkItem' 
                        key={homework.id}>
                            <AtCard
                                title={homework.name}
                            >
                                <View>{`截至：${homework.deadline}`}</View>
                                <View>{homework.introduction.substr(0, 30) + '...'}</View>
                            </AtCard>
                            <View className='homeworkItemMenu'>
                            <AtIcon value='menu'></AtIcon>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}
