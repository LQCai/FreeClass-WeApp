import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './help.scss';
import config from '../../config';
import { AtButton } from 'taro-ui';

export default class Help extends Taro.Component {
    config = {
        navigationBarTitleText: '帮助'
    }

    constructor() {
        super(...arguments)
        this.setState({
            helpList: []
        });
    }

    componentWillMount() {
        Taro.request({
            url: config.server.host + '/user/help/list'
        }).then((res) => {
            if (res.data.code != config.code.success) {
                Taro.showToast({
                    title: res.data.msg,
                    icon: 'none'
                });
            } else {
                this.setState({
                    helpList: res.data.data
                });
            }
        }).catch((e) => {
            console.log(e);
        })
    }
    render() {
        return (
            <View>
                {this.state.helpList.map((help) => (
                    <View
                        key={help.id}
                        className='at-article'>
                        <View className='at-article__h2'>
                            {help.title}
                        </View>
                        <View className='at-article__p'>
                            {help.content}
                        </View>
                        <View className='line'/>
                    </View>
                ))}
            </View>
        );
    }
}
