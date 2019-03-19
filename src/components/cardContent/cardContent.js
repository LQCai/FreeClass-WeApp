import Taro from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import { AtAvatar, AtButton, AtActionSheet, AtActionSheetItem } from "taro-ui";
import "./cardContent.scss";
import right from "../../asset/profileImage/right.png";
import ellipsis from "../../asset/ellipsis.png";
export default class CardContent extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      isOpend: false //判断是否打开动作面板
    };
  }
  /*用于打开动作面板 */
  isOpend() {
    this.setState({
      isOpend: true
    });
  }
  /*打开动作面板后点击取消触发，用于关闭动作面板 */
  handleCancel() {
    this.setState({
      isOpend: false
    });
  }
  /*动作面板的回复和删除功能 */
  handleClick(e) {
    console.log(e);
    this.setState({
      isOpend: false
    });
  }
  /*跳转页面 */
  jump(e) {
    console.log(e);
    if (e == "已读") {
      Taro.navigateTo({
        url: "../../pages/alreadyRead/alreadyRead"
      });
    } else {
      Taro.navigateTo({
        url: "../../pages/comment/comment"
      });
    }
  }
  render() {
    const popup = (
      <AtActionSheet
        isOpened={isOpend}
        cancelText="取消"
        onCancel={this.handleCancel}
      >
        <AtActionSheetItem onClick={this.handleClick.bind(this, "id")}>
          回复
        </AtActionSheetItem>
        <AtActionSheetItem onClick={this.handleClick.bind(this, "id")}>
          删除
        </AtActionSheetItem>
      </AtActionSheet>
    );
    return (
      <View class="backgroundColor">
        <View className="background">
          <View className="title">
            本周六校外招聘会，有兴趣的同学现在找我报名，有派车还有午餐
          </View>
          <View className="publisher">张温兴 03月15日 16:34</View>
          {/* 换行问题没解决 */}
          <View className="content">
            <View className="text">
              活动主题：2019年湖里创新园春季专场人才招聘会
              活动时间：3月16日9:00--1700
              活动地址：湖里区安岭二路108号创业大厦（湖里区行政服务中心）
              专车安排：等候区1：本部艺术会堂门；等候区2：厦软校区
              发车时间：9:00
              http://job.xmut.edu.cn/front/message.jhtml?p=messageInfo&messageNo=2776&messageCode=XM1000011121
            </View>
            <View className="button">
              <AtButton
                type="secondary"
                size="small"
                circle
                onClick={this.jump.bind(this, "已读")}
              >
                <View class="buttonText">
                  153人已读
                  <Image src={right} className="buttonImage" />
                </View>
              </AtButton>
            </View>
          </View>
        </View>
        <View className="comment">
          <View className="commentNumber">公告评论（条数：1）</View>
          <View className="commentContent">
            <View className="commentPublisher">
              <View className="commentText">郑君成 03月16日 16:55</View>
              <Image
                src={ellipsis}
                className="commentEllipsis"
                onClick={this.isOpend}
              />
            </View>
            好的
            <View className="line" />
          </View>
          <View className="commentContent">
            <View className="commentPublisher">
              <View className="commentText">郑君成 03月16日 16:55</View>
              <Image
                src={ellipsis}
                className="commentEllipsis"
                onClick={this.isOpend}
              />
            </View>
            好的
            <View className="line" />
          </View>
          <View className="commentLine" />
        </View>
        <View className="buttonComment">
          <AtButton
            type="secondary"
            size="normal"
            onClick={this.jump.bind(this, "评论")}
          >
            + 添加评论
          </AtButton>
        </View>
        {popup}
      </View>
    );
  }
}
