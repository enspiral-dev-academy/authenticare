import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavLink = styled(Link)`
  margin-right: 30px;
`

const NavGroup = styled.div`
  float: right;
`

export default function Nav () {
  return (
    <React.Fragment>
      <NavGroup>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/signin'>Sign in</NavLink>
      </NavGroup>
      <h1>Fruit FTW!</h1>
    </React.Fragment>
  )
}
