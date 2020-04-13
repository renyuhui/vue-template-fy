import { login, logout, getInfo , login_BI ,login_APP } from '@/api/user'
import { getToken, setToken, removeToken ,IAS_WEB_ST_SSO_ID } from '@/utils/auth'
import { resetRouter } from '@/router'
import {RESET_STATE,SET_TOKEN,SET_NAME,SET_AVATAR} from '@/store/mutation-types'

const state = {
    token: getToken(),
    name: '123123',
    avatar: ''
}

const mutations = {
  [RESET_STATE]: (state) => {
      state = {
          token: '',
          name: '',
          avatar: ''
      }
    // Object.assign(state, getDefaultState())
  },
  [SET_TOKEN]: (state, token) => {
    state.token = token
  },
  [SET_NAME]: (state, name) => {
    state.name = name
  },
  [SET_AVATAR]: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
      // IAS_WEB_ST_SSO_ID('28a4abea-c2f2-4a58-b6af-340eae318064')
      const { data } = {
          code: 20000,
          data: {token: "0812c5bc-632e-452b-a199-52fa2309f556"}
      };
      commit(SET_TOKEN, data.token)
      setToken(data.token);

      // let dataArr = JSON.stringify({"phone":"zzyy"});
      // login_APP(dataArr).then(res=>{
      //     console.log(res)
      // }).catch(res =>{
      //     console.log(res)
      // })
    // const { username, password } = userInfo;
    // return new Promise((resolve, reject) => {
      // login({ username: username.trim(), password: password }).then(response => {
      //     console.log(response);
      //   const { data } = response
      //   commit(SET_TOKEN, data.token)
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
      let newData = {
          code: 20000,
          data: {
              roles: ["admin"],
              introduction: "I am a super administrator",
              avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
              name: "Super Admin"
          }
      }
      const { name, avatar } = newData

      commit(SET_NAME, name)
      commit(SET_AVATAR, avatar)

      // return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      //   const { data } = response
      //
      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }
      //
      //   const { name, avatar } = data
      //
      //   commit(SET_NAME, name)
      //   commit(SET_AVATAR, avatar)
      //   resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    // })
  },

  // user logout
  logout({ commit, state }) {
      removeToken() // must remove  token  first
      resetRouter()
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit(RESET_STATE)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit(RESET_STATE)
      resolve()
    })
  },

  login_BI({commit}){
      login_BI({username:'password',rememberme:'rememberme'}).then(res =>{
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

