import Vue from 'vue'
import Router from 'vue-router'
import map from './map'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  hashbang: true,
  saveScrollPosition: true,
  scrollBehavior: () => ({ y: 0 }),
  routes: map
})
