import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import './message.scss'

import { add, minus, asyncAdd } from '../../actions/counter';

@connect(({ counter }) => ({
    counter,
}), (dispatch) => bindActionCreators({
    add,
    minus,
    asyncAdd,
}, dispatch))

class Message extends Component {
    render() {
        return (
            <View>
                <Button onClick={this.props.add}>+</Button>
                <Button onClick={this.props.minus}>-</Button>
                <Button onClick={this.props.asyncAdd}>asyncAdd</Button>
            </View>
        );
    }
}

export default Message;