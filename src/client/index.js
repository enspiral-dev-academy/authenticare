import request from './request'
import consume from './consume'

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
  setNewPassword,
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
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  if (!isValidEmail(email)) {
    return Promise.reject(
      new Error("That doesn't appear to be a valid email address")
    )
  }

  return consume(url, headers, { email })
}

function setNewPassword (password1, password2, token, options) {
  const baseUrl = options && options.baseUrl
  const url = `${baseUrl || ''}${resetPasswordUrl}/${token}`
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  if (password1 !== password2) {
    return Promise.reject(
      new Error("Passwords don't match")
    )
  }

  return consume(url, headers, { password: password1, token })
}

function getAuthorizationHeader () {
  const token = getEncodedToken()
  return {
    Authorization: token ? `Bearer ${token}` : null
  }
}
