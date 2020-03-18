import defaultSettings from '@/settings'
import { CHANGE_SETTING } from './mutation-types'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

const mutations = {
  [CHANGE_SETTING]: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit(CHANGE_SETTING, data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

