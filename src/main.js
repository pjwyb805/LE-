import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//rem配置
import 'lib-flexible/flexible';
import 'vant/lib/index.css';
// 全局引入按需引入UI库 vant
import '@/plugins/vant.js'

import axios from 'axios'
Vue.prototype.axios=axios
import netlist from './network/index'
Vue.prototype.$netlist = netlist
Vue.config.productionTip = false
// Vue.use(Vant);
new Vue({
  router,
  store,
  netlist,
  render: h => h(App)
}).$mount('#app')
