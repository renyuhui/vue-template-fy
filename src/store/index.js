import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import setters from './setters'

Vue.use(Vuex)
console.log(setters)
const store = new Vuex.Store({
    modules: {
        ...setters
    },
    getters,
})

export default store
