import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './editHomework.scss';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { editHomework } from '../../actions/homework';
import { closeHomeworkItem } from '../../actions/classMenu';
import config from '../../config';
import { AtForm, AtButton, AtInput, AtTextarea, AtImagePicker } from 'taro-ui';

@connect(({ homework, classMenu }) => ({
    homework
}), (dispatch) => bindActionCreators({
    editHomework,
    closeHomeworkItem
}, dispatch))
export default class EditHomework extends Taro.Component {
    config = {
        navigationBarTitleText: '编辑作业'
    }

    constructor() {
        super(...arguments);
        this.state = {
            classId: '',
            teacherId: '',
            id: '',
            name: '',
            introduction: '',
            dateSel: '2019-04-01',
            timeSel: '00:00:00',
            annex: [{
                'url': ''
            }]
        };
    }

    componentWillMount() {
        this.setState({
            classId: this.$router.params.classId,
            teacherId: this.$router.params.teacherId,
            id: this.$router.params.id,
            name: this.$router.params.name,
            introduction: this.$router.params.introduction,
            dateSel: this.$router.params.dateSel,
            timeSel: this.$router.params.timeSel,
            annex: [{ 'url': this.$router.params.annexUrl }]
        });
        this.props.closeHomeworkItem();
    }

    onTimeChange = e => {
        this.setState({
            timeSel: e.detail.value
        })
    }
    onDateChange = e => {
        this.setState({
            dateSel: e.detail.value
        })
    }

    onFileChange(files) {
        console.log(files);
        if (files) {
            this.setState({
                annex: files.length > 0 ? [files[files.length - 1]] : [],
            })
        }
    }

    titleChange(titleValue) {
        this.setState({
            name: titleValue
        })
        console.log(this.state);
    }

    contentChange(event) {
        this.setState({
            introduction: event.target.value
        })
        console.log(this.state);
    }

    onSubmitEdit() {
        const data = this.state;
        if (data.annex.length == 0) {
            Taro.showToast({
                title: '请上传附件',
                icon: 'none'
            });
        } else {
            this.props.editHomework(
                data.teacherId,
                data.classId,
                data.name,
                data.id,
                data.introduction,
                data.dateSel + ' ' + data.timeSel + ":00",
                data.annex[0].url).then((res) => {
                    const resObj = typeof res === 'string' ? JSON.parse(res) : res;
                    if (resObj.code != config.code.success) {
                        Taro.showToast({
                            title: `${resObj.msg}`,
                            icon: 'none'
                        })
                    } else {
                        Taro.showToast({
                            title: '编辑成功',
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
                })
        }
    }

    render() {
        return (
            <View >
                <AtForm
                    onSubmit={this.onSubmitEdit.bind(this)}
                >
                    <AtInput
                        title='作业标题'
                        onChange={this.titleChange.bind(this)}
                        value={this.state.name}
                        onChange={this.titleChange.bind(this)}
                    />
                    <AtTextarea
                        value={this.state.content}
                        placeholder='请输入作业详细内容...'
                        maxlength={255}
                        autoFocus
                        onChange={this.contentChange.bind(this)}
                        value={this.state.introduction}
                        onChange={this.contentChange.bind(this)}
                    />
                    <View className='page-section'>
                        <Picker mode='date' onChange={this.onDateChange}>
                            <View className='picker'>
                                <Text className='picker-label'>截止日期</Text>
                                <Text className='picker-value'>{this.state.dateSel}</Text>
                            </View>
                        </Picker>
                    </View>
                    <View className='page-section'>
                        <Picker mode='time' onChange={this.onTimeChange}>
                            <View className='picker'>
                                <Text className='picker-label'>截止时间</Text>
                                <Text className='picker-value'>{this.state.timeSel}</Text>
                            </View>
                        </Picker>
                    </View>
                    <View>
                        <AtImagePicker
                            count={1}
                            // showAddBtn={this.state.fileButton}
                            files={this.state.annex}
                            onChange={this.onFileChange.bind(this)}
                        />
                    </View>
                    <AtButton formType='submit' type='primary'>提交</AtButton>
                </AtForm>
            </View>
        );
    }
}
