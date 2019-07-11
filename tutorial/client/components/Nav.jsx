import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

// TODO: implement or import a proper logOff function
const logOff = () => {}

const NavGroup = styled.div`
  float: right;
`

const NavLink = styled(Link)`
  margin-right: 30px;
`

export default function Nav () {
  return (
    <React.Fragment>
      <NavGroup>
        <NavLink to='/'>Home</NavLink>
        <IfAuthenticated>
          <NavLink to='#' data-testid='logoff'
            onClick={logOff}>Log off</NavLink>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavLink to='/register' data-testid='register'>Register</NavLink>
          <NavLink to='/signin' data-testid='signin'>Sign in</NavLink>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Fruit FTW!</h1>
    </React.Fragment>
  )
}
