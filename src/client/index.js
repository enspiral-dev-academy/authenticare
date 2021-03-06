import request from './request'
import { signInUrl, registerUrl } from '../endpoints'

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

function getAuthorizationHeader () {
  const token = getEncodedToken()
  return {
    Authorization: token ? `Bearer ${token}` : null
  }
}
