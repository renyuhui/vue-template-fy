import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import date from './modules/date'
import news from './modules/news'
import province from './modules/province'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user,
        date,
        news,
        province
    },
    getters,
})

export default store
