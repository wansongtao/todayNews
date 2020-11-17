import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入组件库
import Vant from 'vant'
//引入vant组件的css文件
import 'vant/lib/index.css'
import { Toast } from 'vant';

//引入axios处理请求
import axios from 'axios'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');

//注册vant ui组件库的标签
Vue.use(Vant);
Vue.use(Toast);

//挂到原型上
Vue.prototype.$axios = axios;
