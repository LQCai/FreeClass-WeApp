import Taro from "@tarojs/taro";
import { View, Text, OpenData } from "@tarojs/components";
import { AtAvatar, AtButton,AtTabs, AtTabsPane } from "taro-ui";
import "./classroomTask.scss";
import ClassroomCard from "../classroomCard/classroomCard"
export default class ClassroomTask extends Taro.Component{
    constructor () {
        super(...arguments)
        this.state = {
          current: 0,
        }
      }
      handleClick (value) {
        this.setState({
          current: value
        })
      }
      render () {
        const tabList = [{ title: '全部' }, { title: '未提交' }, { title: '待批改' },{ title: '被打回' }, { title: '已批改' }]
        return (
          <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
            <AtTabsPane current={this.state.current} index={0} >
              <View className='background' ><ClassroomCard title='做几道练习题' content='一加一啥时候等于三'/></View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View className='background'><ClassroomCard title='做几道练习题' content='一加一啥时候等于三'/></View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View className='background'><ClassroomCard title='做几道练习题' content='一加一啥时候等于三'/></View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={3}>
              <View className='background'><ClassroomCard title='做几道练习题' content='一加一啥时候等于三'/></View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={4}>
              <View className='background'><ClassroomCard title='做几道练习题' content='一加一啥时候等于三'/></View>
            </AtTabsPane>
          </AtTabs>
        )
      }
}
