import React from 'react'
import { isAuthenticated } from 'authenticare/client'

export function IfAuthenticated ({ children }) {
  return isAuthenticated()
    ? <React.Fragment>{ children }</React.Fragment>
    : null
}

export function IfNotAuthenticated ({ children }) {
  return !isAuthenticated()
    ? <React.Fragment>{ children }</React.Fragment>
    : null
}
