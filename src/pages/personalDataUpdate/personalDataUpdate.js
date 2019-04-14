import Taro, { render } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtInput, AtForm, AtButton } from "taro-ui";
import "./personalDataUpdate.scss";

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
