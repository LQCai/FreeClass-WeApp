import Taro, { render } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtInput, AtForm, AtButton } from "taro-ui";
import "./personalDataUpdate.scss";
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { submitUpdate, getUserInfo } from '../../actions/user';
import config from '../../config';
import wreq from '../../utils/request';


@connect(({ user }) => ({
  updateResult: user.updateResult,
  userInfo: user.userInfo
}), (dispatch) => bindActionCreators({
  submitUpdate,
  getUserInfo
}, dispatch))
export default class PersonalDataUpdate extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      item: "",
      text: "",
      content: ""
    };
  }

  componentWillMount() {
    this.setState({
      text: this.$router.params.textName,
      content: this.$router.params.content,
      item: this.$router.params.itemName
    });
  }

  /**
   * 将输入框数据修改后的数据赋给content
   * 
   * @param {*} inputText 
   */
  handleChange(inputText) {
    this.setState({
      content: inputText
    });
  }

  /**
   * 修改用户信息
   */
  updateInfo() {
    this.props.submitUpdate(Taro.getStorageSync('userInfo').openId, this.state.item, this.state.content).catch((e) => {
      console.log(e);
    }).then(() => {
      const updateResult = this.props.updateResult;

      if (updateResult.code != config.code.success) {
        Taro.showToast({
          title: '修改失败',
          'icon': 'none'
        });
      } else {
        const openId = Taro.getStorageSync('userInfo').openId;
        this.props.getUserInfo(openId).catch((e) => {
          console.log(e);
        }).then(() => {
          Taro.setStorage({
            key: 'userInfo',
            data: this.props.userInfo.data
          }).then(() => {
            Taro.showToast({
              title: '修改成功',
              'icon': 'success'
            }).then(() => {
              Taro.navigateBack({
                delta: 1
              });
            });
          });
        });
      }
    });
  }


  render() {
    return (
      <View class="background">
        <View class="backgroundContent">
        </View>
        <AtForm
        >
          <AtInput
            name="value"
            title={this.state.text}
            type="text"
            placeholder=""
            value={this.state.content}
            onChange={this.handleChange.bind(this)}
          >
            <AtButton type="primary" size="small" onClick={this.updateInfo.bind(this)}>
              保存
          </AtButton>
          </AtInput>
        </AtForm>
      </View>
    );
  }
}
