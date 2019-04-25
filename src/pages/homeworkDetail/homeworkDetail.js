import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './homeworkDetail.scss'
import homework from '../../reducers/homework';
import { AtForm, AtCard, AtTextarea, AtImagePicker, AtButton, AtTabs, AtTabsPane } from 'taro-ui';
import { getSubmitList, getHomeworkSubmitInfo, submitHomework } from '../../actions/homework';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import config from '../../config';


@connect(({ homework }) => ({
    homework
}), (dispatch) => bindActionCreators({
    getSubmitList,
    getHomeworkSubmitInfo,
    submitHomework
}, dispatch))
export default class HomeworkDetail extends Taro.Component {
    config = {
        navigationBarTitleText: '作业'
    }

    constructor() {
        super(...arguments);
        this.state = {
            homeworkList: [],
            homeworkDetail: {
                id: '',
                name: '',
                introduction: '',
                deadline: '',
                annexUrl: ''
            },
            userId: '',
            classId: '',
            submitAnnex: [],
            submitContent: '',
            button: false,
            fileButton: true,
            textarea: false,
            current: 0
        };
    }

    componentWillMount() {
        const params = this.$router.params;

        if (params.role == config.role.teacher) {
            this.props.getSubmitList(params.classId, params.id).then(() => {
                this.setState({
                    homeworkDetail: {
                        id: params.id,
                        name: params.name,
                        introduction: params.introduction,
                        deadline: params.deadline,
                        annexUrl: params.annexUrl
                    },
                    userId: params.userId,
                    classId: params.classId,
                    homeworkList: this.props.homework.homeworkSubmitList
                });
            }).catch((e) => {
                console.log(e);
            });
        } else {
            console.log(params.userId);
            console.log(params.id);
            this.props.getHomeworkSubmitInfo(params.userId, params.id).then(() => {
                const submitInfo = this.props.homework.homeworkSubmitInfo;

                // 未提交的情况
                if (submitInfo.status == 2) {
                    this.setState({
                        homeworkDetail: {
                            id: params.id,
                            name: params.name,
                            introduction: params.introduction,
                            deadline: params.deadline,
                            annexUrl: params.annexUrl
                        },
                        userId: params.userId,
                        classId: params.classId,
                    });
                    //已提交
                } else {
                    this.setState({
                        homeworkDetail: {
                            id: params.id,
                            name: params.name,
                            introduction: params.introduction,
                            deadline: params.deadline,
                            annexUrl: params.annexUrl
                        },
                        userId: params.userId,
                        classId: params.classId,
                        button: true,
                        fileButton: false,
                        textarea: true,
                        submitContent: submitInfo.content,
                        submitAnnex: [{ 'url': submitInfo.annexUrl }]
                    });
                }
            });
        }
    }

    changeCurrent(value) {
        this.setState({
            current: value
        })
    }

    contentChange(event) {
        this.setState({
            submitContent: event.target.value
        })
        console.log(this.state);
    }

    onFileChange(files) {
        console.log(files);
        if (files) {
            this.setState({
                submitAnnex: files.length > 0 ? [files[files.length - 1]] : [],
            })
        }
    }

    submitHomework() {
        const data = this.state;
        if (data.submitAnnex.length == 0) {
            Taro.showToast({
                title: '请上传附件',
                icon: 'none'
            });
        } else {
            this.props.submitHomework(
                data.userId,
                data.classId,
                data.homeworkDetail.id,
                data.submitContent,
                data.submitAnnex[0].url).then((res) => {
                    const resObj = JSON.parse(res);
                    if (resObj.code != config.code.success) {
                        Taro.showToast({
                            title: `${resObj.msg}`,
                            icon: 'none'
                        })
                    } else {
                        Taro.showToast({
                            title: '提交成功',
                            icon: 'success'
                        }).then(() => {
                            Taro.navigateBack({
                                delta: 1
                            });
                        }).catch((e) => {
                            console.log(e);
                        });
                    }
                }).catch((e) => {
                    console.log(e);
                });
        }
    }

    render() {
        const tabList = [{ title: '全部' }, { title: '已交' }, { title: '未交 ' }]

        return (
            <View>
                {this.state.homeworkList.length > 0
                    ?
                    <View>
                        <AtTabs current={this.state.current} tabList={tabList} onClick={this.changeCurrent.bind(this)}>
                            {/* 全部提交作业列表 */}
                            <AtTabsPane current={this.state.current} index={0}>
                                {this.state.homeworkList.map((homeworkSubmit) => (
                                    <View key={homeworkSubmit.studentId}>
                                        <View className='card'>
                                            <AtCard
                                                title={homeworkSubmit.studentCode + ' ' + homeworkSubmit.studentName}
                                                extra={homeworkSubmit.status == 1 ? '已交' : '未交'}
                                            >
                                                <Text>
                                                    {homeworkSubmit.status == 1 ? '提交时间：' + homeworkSubmit.created : '。。。'}
                                                </Text>
                                            </AtCard>
                                        </View>
                                    </View>
                                ))}
                            </AtTabsPane>
                            {/* 已交列表 */}
                            <AtTabsPane current={this.state.current} index={1}>
                                {this.state.homeworkList.map((homeworkSubmit) => (
                                    homeworkSubmit.status == 1
                                        ?
                                        <View key={homeworkSubmit.studentId}>
                                            <View className='card'>
                                                <AtCard
                                                    title={homeworkSubmit.studentCode + ' ' + homeworkSubmit.studentName}
                                                    extra={homeworkSubmit.status == 1 ? '已交' : '未交'}
                                                >
                                                    <Text>
                                                        {homeworkSubmit.status == 1 ? '提交时间：' + homeworkSubmit.created : '。。。'}
                                                    </Text>
                                                </AtCard>
                                            </View>
                                        </View>
                                        :
                                        <View></View>
                                ))}
                            </AtTabsPane>
                            {/* 未交列表 */}
                            <AtTabsPane current={this.state.current} index={2}>
                                {this.state.homeworkList.map((homeworkSubmit) => (
                                    homeworkSubmit.status == 2
                                        ?
                                        <View key={homeworkSubmit.studentId}>
                                            <View className='card'>
                                                <AtCard
                                                    title={homeworkSubmit.studentCode + ' ' + homeworkSubmit.studentName}
                                                    extra={homeworkSubmit.status == 1 ? '已交' : '未交'}
                                                >
                                                    <Text>
                                                        {homeworkSubmit.status == 1 ? '提交时间：' + homeworkSubmit.created : '。。。'}
                                                    </Text>
                                                </AtCard>
                                            </View>
                                        </View>
                                        :
                                        <View></View>
                                ))}
                            </AtTabsPane>
                        </AtTabs>
                    </View>
                    :
                    <View>
                        <View>
                            <Text>作业标题:</Text>
                            <Text>{this.state.homeworkDetail.name}</Text>
                        </View>
                        <View>
                            <Text>作业内容:</Text>
                            <Text>{this.state.homeworkDetail.introduction}</Text>
                        </View>
                        <View>
                            <Text>截至:</Text>
                            <Text>{this.state.homeworkDetail.deadline}</Text>
                        </View>
                        <View>
                            <Text>附件:</Text>
                            <Image
                                src={this.state.homeworkDetail.annexUrl}
                                style='width: 100px;height: 100px;background: #fff;'
                            />
                        </View>
                        <View>
                            <AtForm
                                onSubmit={this.submitHomework.bind(this)}
                            >
                                <AtTextarea
                                    disabled={this.state.textarea}
                                    onChange={this.contentChange.bind(this)}
                                    placeholder='请输入作业留言...'
                                    value={this.state.submitContent}
                                >
                                </AtTextarea>
                                <AtImagePicker
                                    count={1}
                                    showAddBtn={this.state.fileButton}
                                    files={this.state.submitAnnex}
                                    onChange={this.onFileChange.bind(this)}
                                />
                                <AtButton
                                    type='primary'
                                    formType='submit'
                                    disabled={this.state.button}
                                >提交</AtButton>
                            </AtForm>
                        </View>
                    </View>
                }
            </View>
        );
    }
}
