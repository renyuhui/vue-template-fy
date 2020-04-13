import Vue from 'vue'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import 'babel-polyfill'

import '@/icons' // icon
import '@/permission' // permission control

import Moment from 'moment'

import uploader from 'vue-simple-uploader'

Vue.prototype.moment = Moment

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(uploader)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    created() {
        if (sessionStorage.getItem("store")) {
            store.replaceState(
                Object.assign(
                    {},
                    store.state,
                    JSON.parse(sessionStorage.getItem("store"))
                )
            );
            sessionStorage.removeItem("store")
        }
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem("store", JSON.stringify(store.state));
        });
    },
    render: h => h(App)
})
