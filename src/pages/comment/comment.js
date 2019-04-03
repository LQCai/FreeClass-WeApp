import Taro, { render } from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import { AtForm, AtTextarea, AtButton, AtToast } from "taro-ui";
import "./comment.scss";

export default class Comment extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: "", //用于储存和改变评论内容
      isOpened: false //用于提示评论内容为空
    };
  }
  /*改变评论内容*/
  handleChange(e) {
    console.log(e);
    this.setState({
      value: e.detail.value
    });
  }
  /*提交评论内容，评论内容为空则提交失败，打开提示框 */
  onSubmit(event) {
    let comment = this.state.value;
    if (comment === "") {
      this.setState({
        isOpened: true
      });
    } else {
      console.log(event);
    }
  }
  /*关闭提示框时触发的事件 */
  onClose(e) {
    this.setState({
      isOpened: false
    });
  }
  render() {
    return (
      <View className="background">
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtTextarea
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
            placeholder="添加评论..."
            maxLength={200}
            textOverflowForbidden={false}
            height={500}
          />
          <View className="interval" />
          <AtButton
            formType="submit"
            type="primary"
            onClick={this.onSubmit.bind(this, "id")}
          >
            发表
          </AtButton>
        </AtForm>
        {/* 提示框 */}
        <AtToast
          isOpened={this.state.isOpened}
          text="评论内容不得为空"
          onClose={this.onClose.bind(this)}
          duration={1000}
        />
      </View>
    );
  }
}
