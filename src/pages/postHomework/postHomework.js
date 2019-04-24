import Taro from '@tarojs/taro';
import { View, Text, Pickek, Image } from '@tarojs/components';
import './postHomework.scss';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { postHomework } from '../../actions/homework';
import config from '../../config';
import { AtForm, AtButton, AtInput, AtTextarea, AtImagePicker } from 'taro-ui';

@connect(({ homework }) => ({
    homework
}), (dispatch) => bindActionCreators({
    postHomework
}, dispatch))
export default class PostHomework extends Taro.Component {
    config = {
        navigationBarTitleText: '发布作业'
    }

    constructor() {
        super(...arguments);
        this.state = {
            title: '',
            content: '',
            files: [],
            dateSel: '2019-04-01',
            timeSel: '00:00:00',
            classId: '',
            teacherId: ''
        };
    }

    componentDidShow() {
        this.setState({
            classId: this.$router.params.classId,
            teacherId: this.$router.params.teacherId
        })
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
                files: [files[files.length - 1]],
            })
        }
    }

    titleChange(titleValue) {
        this.setState({
            title: titleValue
        })
        console.log(this.state);
    }

    contentChange(event) {
        this.setState({
            content: event.target.value
        })
        console.log(this.state);
    }

    onSubmitPost() {
        const data = this.state;
        if (data.files.length == 0) {
            Taro.showToast({
                title: '请上传附件',
                icon: 'none'
            });
        } else {
            this.props.postHomework(data.teacherId,
                data.title,
                data.classId,
                data.content,
                data.dateSel + ' ' + data.timeSel,
                data.files[0].url)
        }
    }

    render() {
        return (
            <View >
                <AtForm
                    onSubmit={this.onSubmitPost.bind(this)}
                >
                    <AtInput
                        title='作业标题'
                        onChange={this.titleChange.bind(this)}
                    />
                    <AtTextarea
                        value={this.state.content}
                        placeholder='请输入作业详细内容...'
                        maxlength={255}
                        autoFocus
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
                            files={this.state.files}
                            onChange={this.onFileChange.bind(this)}
                        />
                    </View>
                    <AtButton formType='submit' type='primary'>提交</AtButton>
                </AtForm>
            </View>
        );
    }
}
