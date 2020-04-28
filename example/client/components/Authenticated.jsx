import React from 'react'
import { isAuthenticated } from 'authenticare/client'

export function IfAuthenticated ({ children }) {
  return isAuthenticated()
    ? <>{ children }</>
    : null
}

export function IfNotAuthenticated ({ children }) {
  return !isAuthenticated()
    ? <>{ children }</>
    : null
}
