import Taro from '@tarojs/taro';
import { View, Text, Pickek, Image } from '@tarojs/components';
import './postAnnounce.scss';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { postAnnounce } from '../../actions/announce';
import config from '../../config';
import { AtForm, AtButton, AtInput, AtTextarea, AtImagePicker } from 'taro-ui';

@connect(({ announce }) => ({
    announce
}), (dispatch) => bindActionCreators({
    postAnnounce
}, dispatch))
export default class PostAnnounce extends Taro.Component {
    config = {
        navigationBarTitleText: '发布公告'
    }

    constructor() {
        super(...arguments);
        this.state = {
            title: '',
            content: '',
            files: [],
            classId: '',
            teacherId: ''
        };
    }

    componentDidShow() {
        this.setState({
            classId: this.$router.params.classId,
            teacherId: this.$router.params.userId
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

    onSubmitPost() {
        const data = this.state;
        if (data.files.length == 0) {
            Taro.showToast({
                title: '请上传附件',
                icon: 'none'
            });
        } else {
            console.log(data);
            this.props.postAnnounce(data.teacherId,
                data.title,
                data.classId,
                data.content,
                data.files[0].url).then((res) => {
                    const resObj = JSON.parse(res);
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
    }

    render() {
        return (
            <View >
                <AtForm
                    onSubmit={this.onSubmitPost.bind(this)}
                >
                    <AtInput
                        title='公告标题'
                        onChange={this.titleChange.bind(this)}
                    />
                    <AtTextarea
                        value={this.state.content}
                        placeholder='请输入公告详细内容...'
                        maxlength={255}
                        autoFocus
                        onChange={this.contentChange.bind(this)}
                    />
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
