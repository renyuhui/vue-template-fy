import {login, logout, getInfo , login_BI,login_APP} from '@/api/user'
import {getDate, setDate, removeDate} from '@/utils/auth'
import {SET_DATE , SET_AREA_INFO} from '@/store/mutation-types'
// import { resetRouter } from '@/router'

const state = {
    date: null,
    area:{
        areaName: null,
        areaCode: null,
        privinceMapData: null
    }
}

const mutations = {
    [SET_DATE]: (state, data) => {
        // Object.assign(state, data)
        state.date = data
    },
    [SET_AREA_INFO]: (state,data) => {
        state.area.areaName = data.areaName;
        state.area.areaCode = data.areaCode;
        state.area.privinceMapData = data.privinceMapData
    }
}

const actions = {
    changeDate({commit}, data) {
        let date = data;
        commit(SET_DATE, date)
    },
    changeArea({commit}, data) {
        commit(SET_AREA_INFO, data)
    },
    login({commit}, userInfo) {
        // login_BI({"phone": 'zzyy'}).then(res => {
        //     console.log(res)
        // }).catch(res => {
        //     console.log(res)
        // })
        let dataArr = JSON.stringify({"phone":"zzyy"});
        login_APP(dataArr).then(res=>{
            console.log(res)
        }).catch(res =>{
            console.log(res)
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}

