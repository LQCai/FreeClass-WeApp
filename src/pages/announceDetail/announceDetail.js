import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './announceDetail.scss'
import homework from '../../reducers/homework';
import { AtForm, AtInput, AtTextarea, AtImagePicker, AtButton, AtTabs, AtTabsPane } from 'taro-ui';
import { } from '../../actions/announce';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import config from '../../config';


@connect(({ announce }) => ({
    announce
}), (dispatch) => bindActionCreators({

}, dispatch))
export default class AnnounceDetail extends Taro.Component {
    config = {
        navigationBarTitleText: '公告'
    }

    constructor() {
        super(...arguments);
        this.state = {
            announceDetail: {
                id: '',
                title: '',
                content: '',
                annexUrl: '',
                created: ''
            },
            userId: '',
            classId: ''
        };
    }

    componentWillMount() {
        const params = this.$router.params;

        this.setState({
            announceDetail: {
                id: params.id,
                title: params.title,
                content: params.content,
                annexUrl: params.annexUrl,
                created: params.created
            },
            userId: params.userId,
            classId: params.classId
        });
    }

    render() {
        return (
            <View>
                <View className='at-article'>
                    <View className='at-article__h1'>
                        {this.state.announceDetail.title}
                    </View>
                    <View className='at-article__info'>
                        {this.state.announceDetail.created}&nbsp;&nbsp;&nbsp;
                    </View>
                    <View className='at-article__content'>
                        <View className='at-article__section'>
                            <View className='at-article__p'>
                                {this.state.announceDetail.content}
                            </View>
                            {this.state.announceDetail.annexUrl == ''
                                ?
                                <View />
                                :
                                <Image
                                    className='at-article__img'
                                    src={this.state.announceDetail.annexUrl}
                                    mode='widthFix' />
                            }

                        </View>
                    </View>
                </View>
                <View className='comment'>
                    <AtForm>
                        <AtInput
                            type='text'
                        >
                            <AtButton formType='reset' type='primary' size='small'>提交</AtButton>
                        </AtInput>
                    </AtForm>
                </View>
            </View>
        );
    }
}
