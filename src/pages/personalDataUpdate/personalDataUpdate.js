import Taro, { render } from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import { AtInput, AtForm, AtButton, AtList, AtListItem,AtCalendar } from "taro-ui";
import "./personalDataUpdate.scss";
import checked from "../../asset/tick/tickBlue.png";
import unchecked from "../../asset/tick/tickWhite .png";

export default class PersonalDataUpdate extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      value: "",
      title: "",
      content:"",
      isLoggedInStudent:"学生",
      isLoggedInTeacher:"老师",
      isTime:false,
    };
  }
  //获取个人资料页面传递过来的参数
  componentWillMount() {
    const title = this.$router.params.parameter;
    const content=this.$router.params.content;
    if (title==="身份"){
      if(content==="学生"){
        this.setState({
          title: title,
          content:content,
          isLoggedInStudent:checked,
          isLoggedInTeacher:unchecked
        });
      }else{
        this.setState({
          title: title,
          content:content,
          isLoggedInStudent:unchecked,
          isLoggedInTeacher:checked
        });
      }
    }else{
      this.setState({
        title: title,
        content:content,
        value:content
      });
    }
    
    console.log(title);
  }
  handleChange(value) {
    console.log("value",value.value)
    this.setState({
      value:value.value
    });
  }
  onSubmit(event) {
    console.log(event);
  }
  handleClick(e){
    console.log("e",e)
    if(e==="学生"){
      this.setState({
        isLoggedInStudent:checked,
        isLoggedInTeacher:unchecked
      });
    }else if(e==="老师"){
      this.setState({
        isLoggedInStudent:unchecked,
        isLoggedInTeacher:checked
      });
  }else{
    this.setState({
      isTime:true
    });
  }
}
  render() {
    let content = null;//用于存放渲染不同的组件
    if (this.state.title === "身份") {
      
      content = (
        <AtList>
          <AtListItem
            title="学生"
            thumb={this.state.isLoggedInStudent}
            onClick={this.handleClick.bind(this, "学生")}
          />
          <AtListItem
            title="老师"
            thumb={this.state.isLoggedInTeacher}
            onClick={this.handleClick.bind(this, "老师")}
          />
        </AtList>
      );
    } else if (this.state.title === "入学时间") {
      content = (
        <AtList>
          <AtListItem
            title="入学时间"
            extraText={this.state.value}
            onClick={this.handleClick.bind(this, "入学时间")}
          />
        </AtList>
      );
    } else {
      content = (
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name="value"
            title={this.state.title}
            type="text"
            placeholder=""
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
        </AtForm>
      );
    }
    return (
      <View class="background">
        <View class="backgroundContent">
          <AtButton formType="submit" type="primary" size="small">
            提交
          </AtButton>
        </View>
        {content}
        {this.state.isTime
        ? <AtCalendar onDayClick={this.handleChange.bind(this)}/>
        : <Text></Text>
      }
      </View>
    );
  }
}
