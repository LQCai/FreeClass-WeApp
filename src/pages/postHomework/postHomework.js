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

    onDateChange = e => {
        this.setState({
            dateSel: e.detail.value
        })
    }

    onFileChange(files) {
        console.log(files);
        if (files) {
            this.setState({
                files: files.length > 0 ? [files[files.length - 1]] : [],
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

    onSubmitPost(e) {
        const formId = e.detail.formId;
        console.log(formId);
        const data = this.state;
        this.props.postHomework(data.teacherId,
            data.title,
            data.classId,
            data.content,
            data.dateSel,
            formId,
            data.files).then((res) => {
                const resObj = typeof res === 'string' ? JSON.parse(res) : res;
                if (resObj.code != config.code.success) {
                    Taro.showToast({
                        title: `${resObj.msg}`,
                        icon: 'none'
                    })
                } else {
                    Taro.showToast({
                        title: '发布成功',
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

    render() {
        return (
            <View >
                <AtForm
                    reportSubmit={true}
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
