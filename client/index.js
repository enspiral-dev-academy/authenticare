const request = require('./request')
const { signInUrl, registerUrl } = require('../constants')

const {
  logOff,
  getAuthToken,
  saveAuthToken,
  isAuthenticated,
  getEncodedToken } = require('./auth')

module.exports = {
  signIn,
  register,
  isAuthenticated,
  getEncodedToken,
  saveToken: saveAuthToken,
  getToken: getAuthToken,
  logOff
}

function register (newUser, options) {
  const baseUrl = options && options.baseUrl
  const url = `${baseUrl || ''}${registerUrl}`
  return request(url, newUser)
}

function signIn (user, options) {
  const baseUrl = options && options.baseUrl
  const url = `${baseUrl || ''}${signInUrl}`
  return request(url, user)
}
