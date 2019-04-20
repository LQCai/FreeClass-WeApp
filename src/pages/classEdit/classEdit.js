import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './classEdit.scss';
import { AtForm, AtSwitch, AtInput, AtButton } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { editClass } from '../../actions/classInfo';

@connect(({ classInfo }) => ({
    classInfo
}), (dispatch) => bindActionCreators({
    editClass
}, dispatch))
export default class ClassEdit extends Taro.Component {
    config = {
        navigationBarTitleText: '编辑课堂'
    }

    constructor() {
        super(...arguments)
        this.setState({
            topping: {
                checked: false,
                value: 2
            },
            className: '',
            classId: '',
            userId: Taro.getStorageSync('userInfo').id
        });
    }

    componentWillMount() {
        this.setState({
            classId: this.$router.params.classId,
            className: this.$router.params.className,
            topping: {
                checked: false,
                value: 2
            },
        });
        if (this.$router.params.topping === '1') {
            this.setState({
                topping: {
                    checked: true,
                    value: 1
                }
            })
        }
        console.log(this.$router.params);
        console.log(this.state);
    }

    changeTopping() {
        if (this.state.topping.checked == false) {
            console.log('是否置顶:' + this.state.topping.value)
            this.setState({
                topping: {
                    checked: true,
                    value: 1
                }
            });
        } else {
            console.log('是否置顶:' + this.state.topping.value);
            this.setState({
                topping: {
                    checked: false,
                    value: 2
                }
            });
        }
    }

    bindClassNameText(value) {
        this.setState({
            className: value
        });
    }

    submitEdit() {
        this.props.editClass(this.state.classId, this.state.userId, this.state.className, this.state.topping.value).then(() => {
            Taro.showToast({
                title: '编辑成功',
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
        console.log(this.state);
        return (
            <View className='class-edit'>
                <View>
                    <AtForm
                    onSubmit={this.submitEdit}>
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
                        <AtButton formType='submit'>提交</AtButton>
                    </AtForm>
                </View>
            </View>
        );
    }
}
