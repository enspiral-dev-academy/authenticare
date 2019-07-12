const decode = require('jwt-decode')

const { saveToken, getToken } = require('./token-storage')

module.exports = {
  saveAuthToken,
  isAuthenticated,
  getDecodedToken,
  getEncodedToken,
  logOff
}

function saveAuthToken (authToken) {
  saveToken(authToken)
  return decode(authToken)
}

function isAuthenticated () {
  const authToken = getToken()

  if (authToken) {
    const payload = decode(authToken)
    const expiry = payload.exp

    if (expiry < new Date().getTime() / 1000) {
      logOff()
      return false
    }
    return true
  } else {
    return false
  }
}

function getDecodedToken () {
  const authToken = getToken()
  return authToken ? decode(authToken) : null
}

function getEncodedToken () {
  return getToken()
}

function logOff () {
  saveToken(null)
}
