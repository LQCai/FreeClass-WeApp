import Taro from '@tarojs/taro';

class WrappedRequest {
  constructor() {
    this.beforeRequest = config => config;
    this.afterRequest = res => res;
    this.afterFail = err => err;
  }

  request(config) {
    return new Promise((resolve, reject) => {
      Taro.showNavigationBarLoading({
        mask: true,
      });
      Taro.request({
        ...this.beforeRequest(config),
        fail: (res) => {
          reject(res);
        },
        success: (res) => {
          const code = res.data.code ? parseInt(res.data.code, 10) : 0;
          console.log('code' + code);
          if (res.status > 299 || res.status < 200 || code >= 1000) {
            return reject(this.afterFail(res));
          }
          return resolve(this.afterRequest(res));
        },
        complete: () => {
          Taro.hideNavigationBarLoading();
        },
      }).catch((e) => {
        console.log('fail here', e);
        return reject(e);
      });
    });
  }

  setInterceptor(before, after, afterFail) {
    this.beforeRequest = before;
    this.afterRequest = after;
    this.afterFail = afterFail;
  }
}

export default new WrappedRequest();
