//引入axios处理请求
import axios from 'axios';
import router from '../router';
import {
  Toast
} from 'vant';
import 'vant/lib/toast/style';

//设置服务器默认路径
axios.defaults.baseURL = 'http://127.0.0.1:5050';

//axios请求拦截器，统一添加token
axios.interceptors.request.use(config => {
  if (!config.headers.authorization && localStorage.token) {
    config.headers.authorization = localStorage.token;
  }

  return config;
});

// 将所有 Toast 的展示时长设置为 1500 毫秒
Toast.setDefaultOptions({
  duration: 1500
});

//axios响应拦截器
axios.interceptors.response.use(res => {
  const {
    message,
    statusCode
  } = res.data;

  let codeRegExp = /^[34]\d{2}$/;

  if (statusCode == 500 || statusCode == 311) {
    //token验证失败
    Toast.fail(message || '请重新登录');
    
    setTimeout(() => {
      router.replace('/login');
      delete localStorage.token;
    }, 1500);
  }
  else if (codeRegExp.test(statusCode)) {
    Toast.fail(message || '服务器繁忙，请稍后再试');
  }

  //必须要返回值，要不然其他axios请求获取不到值
  return res;
});

export default axios;