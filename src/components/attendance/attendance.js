import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './attendance.scss'
import PushItem from '../pushItem/pushItem';
import config from '../../config';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { startDigtal, getAttendanceList } from '../../actions/attendance';
import { AtCard } from 'taro-ui';

@connect(({ attendance }) => ({
    attendance
}), (dispatch) => bindActionCreators({
    startDigtal,
    getAttendanceList
}, dispatch))
export default class Attendance extends Taro.Component {

    componentWillMount() {
        this.setState({
            role: this.props.role,
            classId: this.props.classId,
            userId: Taro.getStorageSync("userInfo").id
        })
    }

    componentDidShow() {
        this.props.getAttendanceList(this.state.classId);
    }

    /**
     * 开始考勤
     */
    startAttendance() {
        this.props.startDigtal(this.state.classId, this.state.userId).then(() => {
            Taro.navigateTo({
                url: '/pages/attendanceDetail/attendanceDetail?id=' + this.props.attendance.startDigitalResult.id
                    + '&classId=' + this.state.classId
                    + '&role=' + this.state.role
                    + '&userId=' + this.state.userId
                    + '&status=' + 1
            });
        });
    }

    /**
     * 显示考勤详情
     */
    showDetail(id, status) {
        if (status == 1) {
            Taro.navigateTo({
                url: '/pages/attendanceDetail/attendanceDetail?id=' + id
                    + '&classId=' + this.state.classId
                    + '&role=' + this.state.role
                    + '&userId=' + this.state.userId
                    + '&status=' + status
            });
        } else {
            Taro.navigateTo({
                url: '/pages/attendanceRecord/attendanceRecord?id=' + id
                    + '&classId=' + this.state.classId
                    + '&role=' + this.state.role
                    + '&userId=' + this.state.userId
            });
        }
    }

    render() {
        const role = this.props.role;

        return (
            <View>
                <View onClick={this.startAttendance}>
                    <PushItem
                        role={role}
                        action={config.action.attendance}
                    />
                </View>
                <View>
                    {this.props.attendance.attendanceList.map((attendanceInfo) => (
                        <View
                            onClick={this.showDetail.bind(this, attendanceInfo.id, attendanceInfo.status)}
                            className='card'
                            key={attendanceInfo.id}>
                            <AtCard
                                title={attendanceInfo.name}
                                extra={attendanceInfo.status == 1 ? '进行中' : '截止'}
                            >
                                <Text>创建时间： {attendanceInfo.created}</Text>
                            </AtCard>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
}
