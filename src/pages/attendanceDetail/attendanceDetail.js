import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './attendanceDetail.scss';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { getAttendanceRealTimeInfo, stopAttendance, dropAttendance, checkIn } from '../../actions/attendance';
import config from '../../config';
import { AtButton, AtForm, AtInput } from 'taro-ui';


@connect(({ attendance }) => ({
    attendance
}), (dispatch) => bindActionCreators({
    getAttendanceRealTimeInfo,
    stopAttendance,
    dropAttendance,
    checkIn
}, dispatch))
export default class AttendanceDetail extends Taro.Component {

    componentWillMount() {
        this.props.getAttendanceRealTimeInfo(this.$router.params.id, this.$router.params.classId);
        this.setState({
            checkInput: ''
        })
    }

    componentDidMount() {
        this.setState({
            timer: setInterval(() => {
                this.props.getAttendanceRealTimeInfo(this.$router.params.id, this.$router.params.classId).then(() => {
                    const realTimeInfo = this.props.attendance.attendanceRealInfo;

                    if (realTimeInfo.status == 3) {
                        Taro.showToast({
                            title: '考勤截止',
                            icon: 'none'
                        }).then(() => {
                            Taro.navigateBack({
                                delta: 1
                            });
                        })
                    }
                }).catch((e) => {
                    console.log(e);
                });
            }, 5000)
        });
    }

    componentWillUnmount() {
        if (this.state.timer != null) {
            clearInterval(this.state.timer);
        }
    }

    /**
     * 设置学生输入的签到码
     * @param {*} value 
     */
    checkInputChange(value) {
        console.log(value);
        this.setState({
            checkInput: value
        })
    }

    /**
     * 放弃考勤
     */
    dropAttendance() {
        this.props.dropAttendance(this.$router.params.id, this.$router.params.classId, this.$router.params.userId).then(() => {
            Taro.showToast({
                title: '废弃考勤成功',
                icon: 'success'
            }).then(() => {
                Taro.navigateBack({
                    delta: 1
                });
            }).catch((e) => {
                console.log(e);
            })
        });
    }

    /**
     * 终止考勤
     */
    stopAttendance() {
        this.props.stopAttendance(this.$router.params.id, this.$router.params.classId, this.$router.params.userId).then(() => {
            Taro.showToast({
                title: '终止成功',
                icon: 'success'
            }).then(() => {
                Taro.navigateBack({
                    delta: 1
                });
            }).catch((e) => {
                console.log(e);
            })
        });
    }

    /**
     * 学生签到
     */
    submitCheck() {
        this.props.checkIn(this.$router.params.id, this.$router.params.classId, this.$router.params.userId).then(() => {
            Taro.showToast({
                title: '签到成功',
                icon: 'success'
            }).then(() => {
                Taro.navigateBack({
                    delta: 1
                });
            }).catch((e) => {
                console.log(e);
            })
        });
    }

    render() {
        const realTimeInfo = this.props.attendance.attendanceRealInfo;
        const role = this.$router.params.role;
        const userId = this.$router.params.userId;

        return (
            <View>
                <View className='header'></View>
                {
                    role == config.role.teacher
                        ?
                        <View>
                            <View className='code'>
                                <Text>{realTimeInfo.code}</Text>
                            </View>
                            <View className='description'>
                                <Text>学生输入以上数字完成签到</Text>
                            </View>
                            <View className='bottom'>
                                <View className=''>
                                    {realTimeInfo.checkCount}/{realTimeInfo.studentCount}
                                </View>
                                <View>
                                    <AtButton
                                    onClick={this.dropAttendance}
                                    className='drop'
                                    type='secondary' 
                                    size='small'>放弃</AtButton>
                                    <AtButton 
                                    onClick={this.stopAttendance}
                                    className='stop' 
                                    type='primary' 
                                    size='small'>结束</AtButton>
                                </View>
                            </View>
                        </View>
                        :
                        <View>
                            <AtForm
                                onSubmit={this.submitCheck.bind(this)}
                            >
                                <AtInput
                                    placeholder="请输入4位课堂签到码"
                                    value={this.state.checkInput}
                                    maxLength={4}
                                    onChange={this.checkInputChange.bind(this)}
                                />
                                <AtButton formType='submit' type='primary'>提交</AtButton>
                            </AtForm>

                        </View>
                }
            </View>
        );
    }
}
