import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './attendanceRecord.scss'
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { getCheckList } from '../../actions/attendance';
import config from '../../config';
import { AtCard, AtTabsPane, AtTabs } from 'taro-ui';

@connect(({ attendance }) => ({
    attendance
}), (dispatch) => bindActionCreators({
    getCheckList
}, dispatch))
export default class AttendanceRecord extends Taro.Component {
    componentWillMount() {
        const role = this.$router.params.role;
        const id = this.$router.params.id;
        const classId = this.$router.params.classId;

        this.props.getCheckList(id, classId);
        this.setState({
            current: 0
        })
    }

    changeCurrent(value) {
        this.setState({
            current: value
        })
    }

    render() {
        const checkList = this.props.attendance.checkList;
        const tabList = [{ title: '全部' }, { title: '出勤' }, { title: '旷课 ' }]
        return (
            <View>
                <View>
                    <AtTabs
                        current={this.state.current}
                        tabList={tabList}
                        onClick={this.changeCurrent.bind(this)}
                    >
                        {/* 全部考勤记录 */}
                        <AtTabsPane
                            current={this.state.current}
                            index={0}>
                            {checkList.map((checkInfo) => (
                                <View
                                    className='card'
                                    key={checkInfo.studentId}>
                                    <AtCard
                                        title={checkInfo.studentCode + ' ' + checkInfo.studentName}
                                        extra={checkInfo.status == 1 ? '出勤' : '旷课'}
                                    >
                                        <Text>{checkInfo.checkTime ? '签到时间：' + checkInfo.checkTime : '...'}</Text>
                                    </AtCard>
                                </View>
                            ))}
                        </AtTabsPane>
                        {/* 已签到记录 */}
                        <AtTabsPane
                            current={this.state.current}
                            index={1}>
                            {checkList.map((checkInfo) => (
                                checkInfo.status == 1
                                    ?
                                    <View
                                        className='card'
                                        key={checkInfo.studentId}>
                                        <AtCard
                                            title={checkInfo.studentCode + ' ' + checkInfo.studentName}
                                            extra={checkInfo.status == 1 ? '出勤' : '旷课'}
                                        >
                                            <Text>{checkInfo.checkTime ? '签到时间：' + checkInfo.checkTime : '...'}</Text>
                                        </AtCard>
                                    </View>
                                    :
                                    <View></View>
                            ))}
                        </AtTabsPane>
                        {/* 旷课记录 */}
                        <AtTabsPane
                            current={this.state.current}
                            index={2}>
                            {checkList.map((checkInfo) => (
                                checkInfo.status == 1
                                    ?
                                    <View></View>
                                    :
                                    <View
                                        className='card'
                                        key={checkInfo.studentId}>
                                        <AtCard
                                            title={checkInfo.studentCode + ' ' + checkInfo.studentName}
                                            extra={checkInfo.status == 1 ? '出勤' : '旷课'}
                                        >
                                            <Text>{checkInfo.checkTime ? '签到时间：' + checkInfo.checkTime : '...'}</Text>
                                        </AtCard>
                                    </View>
                            ))}
                        </AtTabsPane>
                    </AtTabs>
                </View>
            </View>
        );
    }
}
