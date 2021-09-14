import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

const NavGroup = styled.nav`
  float: right;
`

const NavLink = styled(Link)`
  margin-right: 30px;
`

export default function Nav () {
  return (
    <>
      <NavGroup>
        <NavLink to='/'>Home</NavLink>
        <IfAuthenticated>
          <NavLink to='#' onClick={logOff}>Log off</NavLink>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/signin'>Sign in</NavLink>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Enterprise Fruit Management</h1>
      <p>At Foods United National Industries we pride ourselves on delivering the highest quality fruits to our customers. The Enterprise Fruit Management application provides an essential means to ensure accurate Yearly Ubiquity Metric values.</p>
    </>
  )
}
