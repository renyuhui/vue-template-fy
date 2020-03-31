import {login, logout, getInfo , login_BI,login_APP} from '@/api/user'
import {getDate, setDate, removeDate} from '@/utils/auth'
import {PROVINCE_INFO , PROVINCE_LIST} from './mutation-types'

const state = {
    provinceInfo: {
        areaName: null,
        areaCode: null,
        areaNum : null
    },
    provinceList: null
}

const mutations = {
    [PROVINCE_INFO]: (state, data) => {
        // Object.assign(state, data)
        state.provinceInfo.areaName = data.areaName;
        state.provinceInfo.areaCode = data.areaCode;
        state.provinceInfo.areaNum = data.areaNum
    },
    [PROVINCE_LIST]: (state,data) => {
        state.provinceList = data;
    }
}

const actions = {
    getProvinceInfo({commit}, data) {
        commit(PROVINCE_INFO, data)
    },
    getProvinceList({commit}, data) {
        commit(PROVINCE_LIST, data)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}

