import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//导入组件库
// import Vant from 'vant';
// //引入vant组件的css文件
// import 'vant/lib/index.css';

//按需导入
//导入toast轻提示框
import {
  Toast
} from 'vant';
//导入弹出框
import {
  Dialog
} from 'vant';

import 'vant/lib/toast/style';
import 'vant/lib/dialog/style';

//引入axios处理请求
import axios from 'axios';

Vue.config.productionTip = false;

//注册vant ui组件库的标签
// Vue.use(Vant);

//注册toast轻提示框，注册后会自定挂载在vue的原型上，可以通过this.$toast调用
Vue.use(Toast);
//全局注册弹出框
Vue.use(Dialog);

// 将所有 Toast 的展示时长设置为 1500 毫秒
Toast.setDefaultOptions({
  duration: 1500
});

//挂到原型上
Vue.prototype.$axios = axios;

//设置服务器默认路径
axios.defaults.baseURL = 'http://157.122.54.189:9083';

sessionStorage.baseURL = 'http://157.122.54.189:9083';

//axios拦截器
axios.interceptors.response.use(res => {
  const {
    message,
    statusCode
  } = res.data;
  let codeRegExp = /^[45]\d{2}$/;

  if (message === "用户信息验证失败") {
    router.push('/login');
  } else if (message && codeRegExp.test(statusCode)) {
    Toast.fail(message);
  }

  //必须要返回值，要不然其他axios请求获取不到值
  return res;
});

//路由守卫，to要跳转到的页面，from当前页面
router.beforeEach((to, from, next) => {
  const hasToken = localStorage.token;

  if (to.path.indexOf('/personal') != -1) {
    if (hasToken) {
      next();
    } else {
      router.push('/login').catch(err => {});
    }
  } else {
    //必须调用，否则不能跳转到下一个页面
    next();
  }
});

// /**
//  * @description 服务器地址
//  */
// Vue.prototype.$serverUrl = 'http://157.122.54.189:9083';

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app');