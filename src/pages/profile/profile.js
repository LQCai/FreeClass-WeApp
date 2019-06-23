import Taro from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import { AtAvatar, AtButton } from "taro-ui";
import collection from "../../asset/profileImage/collection.png";
import right from "../../asset/profileImage/right.png";
import help from "../../asset/profileImage/help.png";
import "./profile.scss";
export default class Profile extends Taro.Component {
  componentDidMount() {
    console.log("s");
  }
  //跳转到各个页面，通过传过来的e进行判断跳转哪一个页面
  jump(e) {
    if (e == "personalData") {
      console.log(e)
      Taro.navigateTo({
        url: "../../pages/personalData/personalData"
      });
    }
    else if (e == "collection") {
      Taro.navigateTo({
        url: "/pages/detectionCollect/detectionCollect"
      });
    }
    else {
      Taro.navigateTo({
        url: '/pages/help/help'
      });
    }
  }
  render() {
    const userInfo = Taro.getStorageSync('userInfo');
    return (
      <View className="profile">
        <View className="line" />
        <View className="header">
          <View className="user">
            <View className="userName">
              {userInfo.name}
            </View>
            <View className="userAvatar">
              <AtAvatar circle openData={{ type: "userAvatarUrl" }} />
            </View>
          </View>
          <View className="data">
            <AtButton type="secondary" size="small" onClick={this.jump.bind(this, "personalData")}>
              编辑个人资料
            </AtButton>
          </View>
        </View>
        <View className="line" />
        <View className="content" onClick={this.jump.bind(this, "collection")}>
          <View className="box">
            <Image src={collection} className="image" />
          </View>
          <View className="text">我的收藏</View>
          <View className="distance">
            <Image src={right} className="image-right" />
          </View>
        </View>
        <View className='line-part' />
        <ProfileContent content="帮助" />
        <View>
          <View className="content" onClick={this.jump.bind(this, "help")}>
            <View className="box">
              <Image src={help} className="image" />
            </View>
            <View className="text">帮助</View>
            <View className="distance2">
              <Image src={right} className="image-right" />
            </View>
          </View>
        </View>
        <View className="line-part" />
      </View>
    );
  }
}
