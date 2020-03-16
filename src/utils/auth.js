import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const DateKey = 'date'

export function getDate() {
  return Cookies.get(DateKey)
}

export function setDate(token) {
  return Cookies.set(DateKey, token)
}

export function removeDate() {
  return Cookies.remove(DateKey)
}

export function IAS_WEB_ST_SSO_ID(token) {
    return Cookies.set('IAS_WEB_ST_SSO_ID',token)
}