import Taro from '@tarojs/taro';

class WrappedRequest {
  constructor() {
    this.beforeRequest = config => config;
    this.afterRequest = res => res;
  }

  request(config) {
    return new Promise((resolve, reject) => {
      Taro.showLoading({
        mask: true,
      });
      Taro.request({
        ...this.beforeRequest(config),
        fail: (res) => {
          reject(res);
        },
        success: (res) => {
          const code = res.data.code ? parseInt(res.data.code, 10) : 0;
          if (res.status > 299 || res.status < 200 || code >= 1000) {
            return reject(res);
          }
          return resolve(this.afterRequest(res));
        },
        complete: () => {
          Taro.hideLoading();
        },
      }).catch((e) => {
        console.log('fail here', e);
        return reject(e);
      });
    });
  }

  setInterceptor(before, after) {
    this.beforeRequest = before;
    this.afterRequest = after;
  }
}

export default new WrappedRequest();
