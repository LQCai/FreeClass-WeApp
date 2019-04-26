import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './announce.scss'
import PushItem from '../pushItem/pushItem';
import config from '../../config';

export default class Announce extends Taro.Component {
    render() {
        const role = this.props.role;
        const classId = this.props.classId;

        return (
            <View>
                <View>
                    <PushItem
                        role={role}
                        action={config.action.announcement}
                    />
                </View>
                <Text> Announce </Text>
            </View>
        );
    }
}
