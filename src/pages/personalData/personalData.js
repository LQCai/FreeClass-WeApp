import Taro, { render } from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import "./personalData.scss";
import logo from '../../asset/freeClass.png';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';

@connect(({ user }) => ({
  userInfo: user.userInfo
}), (dispatch) => bindActionCreators({
}, dispatch))
export default class PersonalData extends Taro.Component {
  constructor() {
    super(...arguments);
    this.setState({
      userInfo: ""
    });
  }
  componentDidShow() {
    this.setState({
      userInfo: Taro.getStorageSync("userInfo")
    });
  }

  /*跳转进入个人资料编辑页面*/
  handleClick(item, content, text) {
    Taro.navigateTo({
      url: "../../pages/personalDataUpdate/personalDataUpdate?"
        + "itemName=" + item + "&content=" + content + "&textName=" + text
    })
  }
  render() {
    return (
      <View class="background">
        <View class="backgroundContent" />
        <AtList>
          <AtListItem
            title="姓名"
            extraText={this.state.userInfo.name}
            arrow="right"
            onClick={this.handleClick.bind(this, "name", this.state.userInfo.name, '姓名')}
          />
          <AtListItem
            title="学号"
            extraText={this.state.userInfo.serialCode}
            arrow="right"
            onClick={this.handleClick.bind(this, "serialCode", this.state.userInfo.serialCode, '学号')}
          />
          <AtListItem
            title="邮箱"
            extraText={this.state.userInfo.email}
            arrow="right"
            onClick={this.handleClick.bind(this, "email", this.state.userInfo.email, '邮箱')}
          />
        </AtList>
        <View class="backgroundContent" />
        <View className='logo-background'>
          <image src={logo} />
        </View>
      </View>
    );
  }
}
