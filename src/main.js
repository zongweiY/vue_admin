import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import Axios from 'axios'
//vue-quill-editor
import VueQuillEditor from 'vue-quill-editor'
// treeTbale
import treeTbale from 'vue-table-with-tree-grid'

import 'element-ui/lib/theme-chalk/index.css'
// 全局css
import './assets/css/global.css'
// iconFont
import './assets/font/iconfont.css'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.config.productionTip = false

///把treeTable定义成全局组件
Vue.component('tree-table',treeTbale)

Axios.defaults.timeout = 5000 // 请求超时
Axios.defaults.baseURL = '/api/'  // api 即 vue.config.js 中配置的地址

Vue.prototype.$axios = Axios

Vue.use(ElementUi)
Vue.use(VueQuillEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
