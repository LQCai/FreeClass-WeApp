import Taro, { Component } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { AtTabs, AtTabsPane, AtIcon, AtCard } from 'taro-ui';
import './message.scss'

import { add, minus, asyncAdd } from '../../actions/counter';
import { from } from 'array-flatten';

// @connect(({ counter }) => ({
//     counter,
// }), (dispatch) => bindActionCreators({
//     add,
//     minus,
//     asyncAdd,
// }, dispatch))

class Message extends Component {

    constructor() {
        super(...arguments)
        this.state = {
            current: 0,
        }
    }

    //切换tab
    handleClick(value) {
        this.setState({
            current: value
        })
    }

    render() {
        const tabList = [{ title: '通知' }, { title: '评论' }, { title: '私信' }];

        const noticeList = [
            {
                title: '新通知',
                notice: '新通知notice,新通知notice,新通知notice',
                datetime: '2019-04-04'
            },
            {
                title: '新通知',
                notice: '新通知notice,新通知notice,新通知notice',
                datetime: '2019-04-04'
            },
            {
                title: '新通知',
                notice: '新通知notice,新通知notice,新通知notice',
                datetime: '2019-04-05'
            }
        ];

        const commentList = [
            {
                title: '新评论',
                comment: '新评论comment,新评论comment,新评论comment',
                datetime: '2019-04-04'
            },
            {
                title: '新通知',
                comment: '新评论comment,新评论comment,新评论comment',
                datetime: '2019-04-04'
            }
        ];

        const letterList = [
            {
                title: '新私信',
                letter: '新私信letter,新私信letter,新私信letter',
                datetime: '2019-04-04'
            },
            {
                title: '新私信',
                letter: '新私信letter,新私信letter,新私信letter',
                datetime: '2019-04-04'
            }
        ];

        return (
            // <View>
            //     <Button onClick={this.props.add}>+</Button>
            //     <Button onClick={this.props.minus}>-</Button>
            //     <Button onClick={this.props.asyncAdd}>asyncAdd</Button>
            // </View>
            <View className='message'>
                <AtIcon value='check' className='check'></AtIcon>
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
                    <AtTabsPane current={this.state.current} index={0} className='at-tabs__item notice' >
                        <View >
                            {noticeList.map((notice, index) => (
                                <AtCard className='notice-item' key={index}
                                    title={notice.title}
                                    extra={notice.datetime}
                                >
                                    {notice.notice}
                                </AtCard>
                            ))}
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={1} className='at-tabs__item comment'>
                        <View >
                            {commentList.map((comment, index) => (
                                <AtCard className='comment-item' key={index}
                                    title={comment.title}
                                    extra={comment.datetime}
                                >
                                    {comment.comment}
                                </AtCard>
                            ))}
                        </View>
                    </AtTabsPane>
                    <AtTabsPane current={this.state.current} index={2} className='at-tabs__item letter'>
                        <View >
                            {letterList.map((letter, index) => (
                                <AtCard className='letter-item' key={index}
                                    title={letter.title}
                                    extra={letter.datetime}
                                >
                                    {letter.letter}
                                </AtCard>
                            ))}
                        </View>
                    </AtTabsPane>
                </AtTabs>
            </View>
        );
    }
}

export default Message;