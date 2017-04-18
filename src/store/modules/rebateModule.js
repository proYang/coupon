/**
 * @desc  返利数据
 */

import * as types from '../mutationTypes'

const state = {
  balance: 0, // 账户余额
  rebate: {
    page: 1, // 页码
    rebate: 0, // 已获得返利
    rebateHistory: [] // 返利记录
  },
  withdraw: {
    page: 1, // 页码
    balance: 0, // 账户余额
    withdrawHistory: [] // 提现记录
  }
}

const getters = {
  getWithdraw({ state }) {
    return state.withdraw
  }
}

const mutations = {
  [types.SET_REBATE_BALANCE](state, payload) {
    state.balance = payload.balance
  },
  [types.SET_REBATE_HISTORY](state, payload) {
    state.rebate.rebate = payload.rebate
    state.rebate.rebateHistory = state.rebate.rebateHistory.concat(payload.rebateHistory)
  },
  [types.SET_WITHDRAW_HISTORY](state, payload) {
    state.withdraw.balance = payload.balance
    state.withdraw.withdrawHistory = state.withdraw.withdrawHistory.concat(payload.withdrawHistory)
  },
  [types.INIT_REBATE_HISTORY](state, payload) {
    var initData = null
    if (payload.type == 'rebate') {
      initData = {
        page: 1, // 页码
        rebate: 0, // 已获得返利
        rebateHistory: [] // 返利记录
      }
    } else if (payload.type == 'withdraw') {
      initData = {
        page: 1, // 页码
        balance: 0, // 账户余额
        withdrawHistory: [] // 提现记录
      }
    }
    Object.assign(state[payload.type], initData)
  }
}

const actions = {
  fetchBalance({ commit }) {
    Vue.api.fetchBalance().then(res => {
      commit('SET_REBATE_BALANCE', { balance: res.data })
    })
  },
  fetchRebate({ commit, state }) {
    return new Promise(function (resolve, reject) {
      var page = state.rebate.page
      Vue.api.fetchRebateHistory(page).then(res => {
        state.rebate.page++
        commit('SET_REBATE_HISTORY', { rebate: res.data.rebate, rebateHistory: res.data.rebateHistory })
        resolve({ rebateHistory: res.data.rebateHistory, page: page })
      })
    })
  },
  fetchWithdraw({ commit, state }) {
    return new Promise(function (resolve, reject) {
      var page = state.withdraw.page
      Vue.api.fetchWithdrawHistory(page).then(res => {
        state.withdraw.page++
        commit('SET_REBATE_BALANCE', { balance: res.data.balance })
        commit('SET_WITHDRAW_HISTORY', { balance: res.data.balance, withdrawHistory: res.data.withdrawHistory })
        resolve({ withdrawHistory: res.data.withdrawHistory, page: page })
      })
    })
  },
  /**
   *
   * @desc 申请提现
   * @param {Object} payload
   *                  {
   *                    account_real_name : "真实姓名",
   *                    account_phone : "13331",
   *                    account_bank_name : "北京银行",
   *                    account_bank_account : "银行卡号",
   *                    withdrawAmount : "1000元"
   *                   }
   */
  applyWithdrawal({ state }, payload) {
    return new Promise(function (resolve, reject) {
      Vue.api.applyWithdrawal(payload).then(res => {
        resolve(res)
      })
    })
  },
  initHistory({ commit }, payload) {
    commit('INIT_REBATE_HISTORY', { type: payload.type })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
