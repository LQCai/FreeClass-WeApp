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
  }
  /*跳转进入个人资料编辑页面*/
  handleClick(e,c){
    console.log("e",e,c)
  Taro.navigateTo({
    url:"../../pages/personalDataUpdate/personalDataUpdate?parameter="+e+"&content="+c
  })
  }
  render() {
    const userInfo = Taro.getStorageSync('userInfo');
    
    return (
      <View class="background">
        <View class="backgroundContent" />
        <AtList>
          <AtListItem
            title="姓名"
            extraText={userInfo.name}
            arrow="right"
            onClick={this.handleClick.bind(this,"姓名",userInfo.name)}
          />
          <AtListItem
            title="学号"
            extraText={userInfo.serialCode}
            arrow="right"
            onClick={this.handleClick.bind(this,"学号",userInfo.serialCode)}
          />
          <AtListItem
            title="邮箱"
            extraText={userInfo.email}
            arrow="right"
            onClick={this.handleClick.bind(this,"邮箱",userInfo.email)}
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
