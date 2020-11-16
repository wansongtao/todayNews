import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入组件库
import Vant from 'vant'
//引入vant组件的css文件
import 'vant/lib/index.css'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');

//注册vant ui组件库的标签
Vue.use(Vant);
