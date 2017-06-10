/**
 * @describe  存放根mutation
 *
 * @example
 */
import * as types from './mutationTypes'

export default {
  // 设置用户资料
  [types.SET_SHOP_INFO](state, payload) {
    if (payload.data.user_sex == 1) {
      payload.data.user_sex = '男'
    } else if (payload.data.user_sex == 0) {
      payload.data.user_sex = '女'
    } else {
      payload.data.user_sex = '未知'
    }
    state.userInfo = payload.data
  },
  [types.SET_SHOP_INFO](state, payload) {
    state.couponInfo.coupons = payload
  }
}
