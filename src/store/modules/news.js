import {login, logout, getInfo , login_BI,login_APP} from '@/api/user'
import {GET_NEWS} from './mutation-types'

const state = {
    newsList: [
        { message: '我向left滚动1' },
        { message: '我向left滚动2' },
        { message: '我向left滚动3' }
    ]
}

const mutations = {
    [GET_NEWS]: (state, data) => {
        // Object.assign(state, data)
        state.newsList = data
    }
}

const actions = {
    getNewsList({commit}, data) {
        let newsList = data;
        commit(GET_NEWS, newsList)
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}

