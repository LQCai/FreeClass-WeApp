import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import './createClass.scss';
import { AtForm, AtInput, AtButton, AtSwitch } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { createClass } from '../../actions/classInfo';


@connect(({ classInfo }) => ({
    classInfo
}), (dispatch) => bindActionCreators({
    createClass
}, dispatch))
export default class CreateClass extends Taro.Component {
    config = {
        navigationBarTitleText: '创建课堂'
    }

    constructor() {
        super(...arguments)
        this.setState({
            className: '',
            topping: {
                checked: false,
                value: 1
            },
            userId: Taro.getStorageSync('userInfo').id
        });
    }

    changeTopping() {
        if (this.state.topping.checked == false) {
            console.log('是否置顶:' + this.state.topping.value)
            this.setState({
                topping: {
                    checked: true,
                    value: 2
                }
            });
        } else {
            console.log('是否置顶:' + this.state.topping.value);
            this.setState({
                topping: {
                    checked: false,
                    value: 1
                }
            });
        }
    }

    bindClassNameText(value) {
        this.setState({
            className: value
        });
    }

    submitCreate() {
        this.props.createClass(this.state.userId, this.state.className, this.state.topping.value).then(() => {
            Taro.showToast({
                title: '创建成功',
                icon: 'success',
                duration: 2000
            }).then(() => {
                Taro.reLaunch({
                    url: '/pages/index/index'
                });
            })
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        return (
            <View className='create-class'>
                <View>
                    <AtForm>
                        <AtInput
                            title='课堂名'
                            value={this.state.className}
                            onChange={this.bindClassNameText.bind(this)}
                        />
                        <AtSwitch
                            title='是否置顶'
                            checked={this.state.topping.checked}
                            onChange={this.changeTopping}
                        />
                    </AtForm>
                    <AtButton className='submit' onClick={this.submitCreate}>提交</AtButton>
                </View>
            </View>
        );
    }
}
