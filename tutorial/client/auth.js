import {
  isAuthenticated,
  register,
  signIn,
  getEncodedToken
} from 'authenticare/client'

import { baseApiUrl } from './config'

export function registerNewUser (user) {
  return register(user, { baseUrl: baseApiUrl })
}

export function signInUser (user) {
  return signIn(user, { baseUrl: baseApiUrl })
}

export function isAuthenticated () {
  return isAuthenticated()
}

export function getEncodedToken () {
  return getEncodedToken()
}
