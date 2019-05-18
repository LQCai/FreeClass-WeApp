import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from '_taro-ui@2.0.2@taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import config from '../../config';
import { commet, commentDelete, getDetectionCollectList } from '../../actions/detection';


@connect(({ detection }) => ({
  detection
}), (dispatch) => bindActionCreators({
  commentDelete,
  commet,
  getDetectionCollectList
}, dispatch))
export default class DetectionComment extends Taro.Component {
  componentWillMount() {
    this.setState({
      content: '',
      articleId: this.$router.params.articleId,
      type: this.$router.params.type
    });
  }

  handleTextChange(value) {
    console.log(this.state);
    this.setState({
      content: value
    })
  }

  submit() {
    this.props.commet(this.state.articleId, this.state.content).then(() => {
      Taro.showToast({
        title: '评论成功',
        icon: 'success'
      }).then(() => {
        if (this.state.type == 1) {
          Taro.reLaunch({
            url: '/pages/detection/detection'
          });
        } else {
          this.props.getDetectionCollectList().then(() => {
            Taro.navigateBack({
              delta: 1
            });
          }).catch((e) => {
            console.log(e);
          })
        }
      })
    }).catch((e) => {
      console.log(e);
    })
  }

  render() {
    return (
      <View>
        <AtForm
        >
          <AtInput
            value={this.state.content}
            onChange={this.handleTextChange.bind(this)}
          />
          <AtButton
            size='normal'
            type='primary'
            className='button'
            onClick={this.submit}
          >评论</AtButton>
        </AtForm>
      </View>
    );
  }
}
