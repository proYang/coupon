import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as state from './state'
import mutations from './mutations'

Vue.use(Vuex)

let store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

Vue.$store = store

export default store
