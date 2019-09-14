const request = require('./request')
const { signInUrl, registerUrl } = require('../endpoints')

const {
  isAuthenticated,
  getDecodedToken,
  getEncodedToken,
  logOff } = require('./auth')

module.exports = {
  signIn,
  logOff,
  register,
  isAuthenticated,
  getEncodedToken,
  getDecodedToken,
  getAuthorizationHeader
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

function getAuthorizationHeader () {
  const token = getEncodedToken()
  return {
    "Authorization": token ? `Bearer ${token}` : null
  }
}
