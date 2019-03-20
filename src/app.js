import Taro, { Component } from "@tarojs/taro";
import Index from "./pages/index";
import _ from "lodash";
import { Provider } from "@tarojs/redux";

import configStore from "./store/index";

import "taro-ui/dist/style/index.scss";
import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {
  config = {
    pages: [
      "pages/notice/notice",
      "pages/alreadyRead/alreadyRead",
      "pages/comment/comment",
      "pages/studentWork/studentWork",
      "pages/classroom/classroom",
      "pages/profile/profile",
      "pages/index/index",
      "pages/message/message",
      "pages/auth/auth"
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
