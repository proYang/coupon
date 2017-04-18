/**
 * @description 全局配置项
 */

import api from '../api'

export default function plugin(Vue) {
  // api 配置
  Vue.api = api
  Vue.prototype.$api = api
}
