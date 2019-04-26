import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";
import _ from "lodash";
import { Provider } from "@tarojs/redux";

import configStore from "./store/index";

import "taro-ui/dist/style/index.scss";
import "./app.scss";
import wreq from './utils/request';

const store = configStore();

class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/message/message",
      "pages/profile/profile",
      "pages/auth/auth",
      "pages/personalData/personalData",
      "pages/personalDataUpdate/personalDataUpdate",
      "pages/notice/notice",
      "pages/alreadyRead/alreadyRead",
      "pages/comment/comment",
      "pages/studentWork/studentWork",
      "pages/classroom/classroom",
      "pages/joinClass/joinClass",
      "pages/createClass/createClass",
      "pages/classEdit/classEdit",
      "pages/postHomework/postHomework",
      "pages/editHomework/editHomework",
      "pages/homeworkDetail/homeworkDetail",
      "pages/attendanceDetail/attendanceDetail",
    ],
    tabBar: {
      color: "#595959",
      selectedColor: "#6190E8",
      backgroundColor: "#fff",
      list: [
        {
          iconPath: "./asset/tabbar/class.png",
          selectedIconPath: "./asset/tabbar/class_active.png",
          pagePath: "pages/index/index",
          text: "课程"
        },
        {
          iconPath: "./asset/tabbar/message.png",
          selectedIconPath: "./asset/tabbar/message_active.png",
          pagePath: "pages/message/message",
          text: "消息"
        },
        {
          iconPath: "./asset/tabbar/user.png",
          selectedIconPath: "./asset/tabbar/user_active.png",
          pagePath: "pages/profile/profile",
          text: "我的"
        }
      ]
    },

    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#3d50b4",
      navigationBarTitleText: "Free Class",
      navigationBarTextStyle: "white"
    }
  };

  componentDidShow() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));


wreq.setInterceptor(
  (config) => {
    const newConfig = config;
    console.log('config', newConfig);
    return newConfig;
  },
  (res) => {
    // 请求成功时进行拦截
    // 当状态码为0000时更新缓存以及store中的token
    console.log('res', res);
    // if (res.data.status === '0000') {
    //   const newToken = res.data.token;
    //   const userInfo = _.get(store.getState(), 'user.userInfo', {});
    //   if (!newToken) return res;
    //   store.dispatch({
    //     type: USER_GET_ALL,
    //     payload: {
    //       ...userInfo, token: newToken,
    //     },
    //   });
    //   Taro.setStorage({
    //     key: 'token',
    //     data: newToken,
    //   }).catch((e) => {
    //     console.error(e);
    //   });
    // }
    return res;
  },
  (res) => {
    // 当请求失败时进行拦截
    // const { dispatch } = store;
    const { msg } = res.data;
    console.log(msg);
    if (msg) {
      Taro.showToast({
        icon: 'none',
        title: msg,
      });
    }
    // if (_.get(res, 'data.status') === '1002') {
    //   Taro.removeStorage({ key: 'token' })
    //     .then(() => {
    //       dispatch({
    //         type: USER_LOG_OUT,
    //       });
    //       Taro.showToast({
    //         icon: 'none',
    //         title: '登录信息失效，请重新登录',
    //       });
    //     })
    //     .catch(e => console.error(e));
    // }
    return res;
  },
);