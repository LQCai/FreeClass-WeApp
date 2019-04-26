import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './startAttendance.scss';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { startDigtal } from '../../actions/attendance';

@connect(({ attendance }) => ({
    attendance
}), (dispatch) => bindActionCreators({
    startDigtal
}, dispatch))
export default class StartAttendance extends Taro.Component {

    componentWillMount() {
        const teacherId = this.$router.params.teacherId;
        const classId = this.$router.params.classId;

        this.props.startDigtal(classId, teacherId);
    }

    render() {
        console.log(this.$router.params);
        return (
            <View>
                <Text> StartAttendance </Text>
            </View>
        );
    }
}
