// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('babel-polyfill')
import Vue from 'vue'
import App from './App'
import router from './router'
import globalConfig from './utils/globalConfig'
import ElementUI from 'element-ui'
import './assets/css/reset.css'
import 'element-ui/lib/theme-default/index.css'   // 默认主题

Vue.use(globalConfig)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
