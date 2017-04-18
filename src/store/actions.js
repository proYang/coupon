// /**
//  * @describe  存放根action
//  */
import Vue from 'vue'
import * as types from './mutationTypes'

// export const setCurInvitedId = ({commit, state}, payload) => {
//   commit('SET_CUR_INVITED_ID', payload)
// }

// 设置用户信息
export const getUserInfo = ({ commit, state }, payload) => {
  Vue.api.getUserInfo().then((res) => {
    commit(types.SET_USER_INFO, {data: res.data})
  })
}
