import Taro, { Component } from '@tarojs/taro';
import Index from './pages/index';
import _ from 'lodash';
import { Provider } from '@tarojs/redux';

import configStore from './store/index';

import 'taro-ui/dist/style/index.scss'
import './app.scss';
import wreq from './utils/request';


// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/message/message',
      'pages/profile/profile',
    ],
    tabBar: {
      color: '#595959',
      selectedColor: '#6190E8',
      backgroundColor: '#fff',
      list: [
        {
          iconPath: './asset/tabbar/class.png',
          selectedIconPath: './asset/tabbar/class_active.png',
          pagePath: 'pages/index/index',
          text: '课程',
        },
        {
          iconPath: './asset/tabbar/message.png',
          selectedIconPath: './asset/tabbar/message_active.png',
          pagePath: 'pages/message/message',
          text: '消息',
        },
        {
          iconPath: './asset/tabbar/user.png',
          selectedIconPath: './asset/tabbar/user_active.png',
          pagePath: 'pages/profile/profile',
          text: '我的',
        },
      ],
    },

    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#3d50b4',
      navigationBarTitleText: 'Free Class',
      navigationBarTextStyle: 'white'
    }
  }


  componentDidShow() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    const state = store.getState();
    const openId = Taro.getStorageSync('openId');
    if (!openId) {
      this.login();
    } else {
      Taro.reLaunch({
        url: 'pages/index/index',
      });
    }
  }

  login() {
    //获取code,向后台请求获取openId
    Taro.login().then(res => {
      console.log(res.code)
      const code = res.code;
      wreq.request({
        url: '',//后台尚未开工
        method: 'POST',
        data: {

        },
      }).then((res) => {
        //TODO 拿到openId后存入storage,然后跳转首页
        console.log(res.data);
        Taro.reLaunch({
          url: 'pages/index/index',
        });
      }).catch((e) => {
        console.log(e);
      });
    });
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))


