//引入axios处理请求
import axios from 'axios';
import router from '../router';

//设置服务器默认路径
axios.defaults.baseURL = 'http://127.0.0.1:5050';

//axios请求拦截器，统一添加token
axios.interceptors.request.use(config => {
  if (!config.headers.authorization && localStorage.token) {
    config.headers.authorization = localStorage.token;
  }

  return config;
});

//axios响应拦截器
axios.interceptors.response.use(res => {
  const {
    message,
    statusCode
  } = res.data;

  let codeRegExp = /^[34]\d{2}$/;

  if (statusCode == 500) {
    //token验证失败
    router.replace('/login');
  } else if (codeRegExp.test(statusCode)) {
    Toast.fail(message || '服务器繁忙，请稍后再试');
  }

  //必须要返回值，要不然其他axios请求获取不到值
  return res;
});

export default axios;