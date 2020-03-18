import {login, logout, getInfo , login_BI,login_APP} from '@/api/user'
import {getDate, setDate, removeDate} from '@/utils/auth'
import {SET_DATE} from './mutation-types'
// import { resetRouter } from '@/router'

const state = {
    date: null
}

const mutations = {
    [SET_DATE]: (state, data) => {
        // Object.assign(state, data)
        state.date = data
    }
}

const actions = {
    changeDate({commit}, data) {
        let date = data;
        return commit(SET_DATE, date)
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

