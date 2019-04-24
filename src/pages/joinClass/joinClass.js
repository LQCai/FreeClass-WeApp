import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './joinClass.scss';
import { AtForm, AtInput, AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { joinClass } from '../../actions/classInfo';

@connect(({ classInfo }) => ({
    classInfo
}), (dispatch) => bindActionCreators({
    joinClass
}, dispatch))
export default class JoinClass extends Taro.Component {

    constructor() {
        super(...arguments)
        this.setState({
            code: '',
            userId: Taro.getStorageSync('userInfo').id
        });
    }

    submitJoin() {
        this.props.joinClass(this.state.userId, this.state.code).then(() => {
            Taro.showToast({
                title: '加入成功',
                icon: 'success',
                duration: 2000
            }).then(() => {
                Taro.reLaunch({
                    url: '/pages/index/index'
                });
            }).catch((e) => {
                console.log(e);
            });
        });
    }

    codeChange(value) {
        this.setState({
            code: value
        });
    }


    render() {
        return (
            <View>
                <AtForm
                    onSubmit={this.submitJoin}
                >
                    <AtInput
                        type='text'
                        maxLength='6'
                        placeholder='通过6位邀请码加入班级'
                        value={this.state.code}
                        onChange={this.codeChange.bind(this)}
                    >

                    </AtInput>
                    <AtButton formType='submit'>提交</AtButton>
                </AtForm>
            </View>
        );
    }
}
