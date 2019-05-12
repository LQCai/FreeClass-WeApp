import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTextarea, AtForm, AtImagePicker, AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { postDetection } from '../../actions/detection';

@connect(({ detection }) => ({
    detection
}), (dispatch) => bindActionCreators({
    postDetection
}, dispatch))
export default class PostDetection extends Taro.Component {
    constructor() {
        super(...arguments)
        this.state = {
            text: '',
            images: [],
            userId: Taro.getStorageSync("userInfo").id
        }
    }
    handleTextChange(event) {
        this.setState({
            text: event.target.value
        })
    }
    onImageChange(files) {
        if (files.length > 3) {
            Taro.showToast({
                title: '只允许上传3帐图片',
                icon: 'none'
            });
        } else {
            this.setState({
                images: files
            });
        }
    }
    submit() {
        this.props.postDetection(
            this.state.text,
            this.state.userId,
            this.state.images
        )
    }

    render() {
        return (
            <View>
                <AtForm>
                    <AtTextarea
                        value={this.state.text}
                        onChange={this.handleTextChange.bind(this)}
                        maxLength={200}
                    />
                    <AtImagePicker
                        files={this.state.images}
                        count={3}
                        onChange={this.onImageChange.bind(this)}
                    />
                </AtForm>
                <AtButton
                    size='normal'
                    type='primary'
                    className='button'
                    onClick={this.submit}
                >发布</AtButton>
            </View>
        );
    }
}
