import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from '_taro-ui@2.0.2@taro-ui';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import config from '../../config';
import { commet, commentDelete } from '../../actions/detection';


@connect(({ detection }) => ({
  detection
}), (dispatch) => bindActionCreators({
  commentDelete,
  commet
}, dispatch))
export default class DetectionComment extends Taro.Component {
  componentWillMount() {
    this.setState({
      content: '',
      articleId: this.$router.params.articleId
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
        Taro.navigateBack({
          delta: 1
        });
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
