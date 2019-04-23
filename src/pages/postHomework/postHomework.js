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
            files: [{ url: '' }],
            dateSel: '2019-04-01',
            timeSel: '00:00:00'
        };
    }

    componentDidShow() {

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
        this.setState({
            files
        })
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

    render() {
        return (
            <View >
                <AtForm>
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
