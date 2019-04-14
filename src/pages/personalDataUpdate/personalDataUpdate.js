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
  updateResult: user.updateResult
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

  handleChange(value) {
    console.log("value", value.value)
    this.setState({
      value: value.value
    });
  }
  
  onSubmit(event, item, content) {
    this.props.submitUpdate(Taro.getStorageSync('userInfo').openId, item, content).catch((e) => {
      console.log(e);
    }).then(() => {
      const updateResult = this.props.updateResult;

      if (updateResult.code == config.code.success) {
        Taro.showToast({
          title: '修改失败',
          'icon': 'none'
        });
      }else {
        const openId = Taro.getStorageSync('userInfo').openId;
        this.props.getUserInfo(openId).catch((e) => {
          console.log(e);
        }).then(() => {
          Taro.setStorageSync('userInfo', this.props.userInfo.data).then(() => {
            Taro.showToast({
              title: '修改成功',
              'icon': 'success'
            }).then(() => {
              Taro.reLaunch({
                url: '/pages/personalData/personalData'
              });
            });
          });
        });
      }
    });
  }


  render() {
    this.setState({
      text: this.$router.params.textName,
      content: this.$router.params.content,
      item: this.$router.params.itemName
    });

    return (
      <View class="background">
        <View class="backgroundContent">

        </View>
        <AtForm
          onSubmit={this.onSubmit.bind(this, item, content)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name="value"
            title={this.state.text}
            type="text"
            placeholder=""
            value={this.state.content}
            onChange={this.handleChange.bind(this)}
          >
            <AtButton formType="submit" type="primary" size="small">
              保存
          </AtButton>
          </AtInput>
        </AtForm>
      </View>
    );
  }
}
