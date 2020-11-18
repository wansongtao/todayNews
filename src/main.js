import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

//导入组件库
import Vant from 'vant';
//引入vant组件的css文件j
import 'vant/lib/index.css';
//导入toast轻提示框
import { Toast } from 'vant';
//导入弹出框
import { Dialog } from 'vant';

//引入axios处理请求
import axios from 'axios';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');

//注册vant ui组件库的标签
Vue.use(Vant);
//注册toast轻提示框，注册后会自定挂载在vue的原型上，可以通过this.$toast调用
Vue.use(Toast);
//全局注册弹出框
Vue.use(Dialog);

// 将所有 Toast 的展示时长设置为 1500 毫秒
Toast.setDefaultOptions({ duration: 1500 });

//挂到原型上
Vue.prototype.$axios = axios;

/**
 * @description 服务器地址
 */
Vue.prototype.$serverUrl = 'http://157.122.54.189:9083';
