import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './pushItem.scss'
import config from '../../config';
import { AtButton } from 'taro-ui';

export default class PushItem extends Taro.Component {
    constructor() {
        super(...arguments);
        this.state = {
            actionName: ''
        };
    }

    componentDidShow() {
        this.setState({
            actionName: this.getActionName(this.props.action, this.props.role)
        })
    }

    getActionName(action, role) {
        if (role == config.role.teacher) {
            switch (action) {
                case config.action.homework:
                    return '发布作业';
                case config.action.material:
                    return '分享资料';
                case config.action.announcement:
                    return '发布公告';
                case config.action.attendance:
                    return '开始考勤';
                default:
                    return '';
            }
        }
        return '';
    }

    render() {
        const role = this.props.role;

        if (role == config.role.teacher) {
            return (
                <View>
                    <AtButton>{this.state.actionName}</AtButton>
                </View>
            );
        }
        return (
            <View></View>
        );
    }
}
