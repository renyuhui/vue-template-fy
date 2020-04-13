import defaultSettings from '@/settings'
import {CHANGE_SETTING, BI_DETAIL_BG} from '@/store/mutation-types'

const {showSettings, fixedHeader, sidebarLogo} = defaultSettings

const state = {
    showSettings: showSettings,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    BIBG: '#071347',
    detail: false,
    titles: '复医天健智慧医院后勤运营平台',
    menuList: ['驾驶舱', '品质控制', '安全生产', '保洁运送', '工程维修', '膳食餐饮'],
    noMenuList: ['', '', '', '', '', '']
}

const mutations = {
    [CHANGE_SETTING]: (state, {key, value}) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    },
    [BI_DETAIL_BG]: (state, data) => {
        state.detail = data
    }
}

const actions = {
    changeSetting({commit}, data) {
        commit(CHANGE_SETTING, data)
    },
    changeDetailBg({commit}, data) {
        // console.log(data,123)
        commit(BI_DETAIL_BG, data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

