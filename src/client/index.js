import request from './request'
import {
  isValidEmail,
  signInUrl,
  registerUrl,
  resetPasswordUrl
} from '../shared'

import {
  isAuthenticated,
  getDecodedToken,
  getEncodedToken,
  logOff
} from './auth'

module.exports = {
  signIn,
  logOff,
  register,
  resetPassword,
  isAuthenticated,
  getDecodedToken,
  getEncodedToken,
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

function resetPassword (email, options) {
  const baseUrl = options && options.baseUrl
  const url = `${baseUrl || ''}${resetPasswordUrl}`
  if (!isValidEmail(email)) {
    return Promise.reject(
      new Error("That doesn't appear to be a valid email address")
    )
  }
  return request(url, { email })
}

function getAuthorizationHeader () {
  const token = getEncodedToken()
  return {
    Authorization: token ? `Bearer ${token}` : null
  }
}
