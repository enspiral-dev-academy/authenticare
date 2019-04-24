const request = require('./request')
const { signInUrl, registerUrl } = require('../endpoints')

const {
  logOff,
  getAuthToken,
  isAuthenticated,
  getEncodedToken } = require('./auth')

module.exports = {
  signIn,
  logOff,
  register,
  isAuthenticated,
  getEncodedToken,
  getToken: getAuthToken
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
