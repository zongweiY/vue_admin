import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
// 全局css
import './assets/css/global.css'
// iconFont
import './assets/font/iconfont.css'

Vue.config.productionTip = false

Axios.defaults.timeout = 5000 // 请求超时
Axios.defaults.baseURL = '/api/'  // api 即 vue.config.js 中配置的地址

Vue.prototype.$axios = Axios
Vue.use(ElementUi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
