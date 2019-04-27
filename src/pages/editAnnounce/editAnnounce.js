import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './editAnnounce.scss';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { editAnnounce } from '../../actions/announce';
import { closeAnnounceItem } from '../../actions/classMenu';
import config from '../../config';
import { AtForm, AtButton, AtInput, AtTextarea, AtImagePicker } from 'taro-ui';

@connect(({ announce }) => ({
    announce
}), (dispatch) => bindActionCreators({
    editAnnounce,
    closeAnnounceItem
}, dispatch))
export default class EditAnnounce extends Taro.Component {
    config = {
        navigationBarTitleText: '编辑公告'
    }

    constructor() {
        super(...arguments);
        this.state = {
            classId: '',
            teacherId: '',
            id: '',
            title: '',
            content: '',
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
            title: this.$router.params.title,
            content: this.$router.params.content,
            annex: [{ 'url': this.$router.params.annexUrl }]
        });
        this.props.closeAnnounceItem();
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

    onSubmitEdit() {
        const data = this.state;
        if (data.annex.length == 0) {
            Taro.showToast({
                title: '请上传附件',
                icon: 'none'
            });
        } else {
            this.props.editAnnounce(
                data.id,
                data.teacherId,
                data.title,
                data.classId,
                data.content,
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
                        title='公告标题'
                        onChange={this.titleChange.bind(this)}
                        value={this.state.title}
                        onChange={this.titleChange.bind(this)}
                    />
                    <AtTextarea
                        placeholder='请输入公告详细内容...'
                        maxlength={255}
                        autoFocus
                        onChange={this.contentChange.bind(this)}
                        value={this.state.content}
                        onChange={this.contentChange.bind(this)}
                    />
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
