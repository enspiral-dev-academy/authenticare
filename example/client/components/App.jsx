import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Fruits from './Fruits'
import Register from './Register'
import SignIn from './SignIn'

const NavLink = styled(Link)`
  margin-right: 30px;
`

const NavGroup = styled.div`
  float: right;
`

class App extends React.Component {
  render () {
    const Nav = () => (
      <React.Fragment>
        <NavGroup>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/signin'>Sign in</NavLink>
        </NavGroup>
        <h1>Fruit FTW!</h1>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <Router>
          <Route path='/' component={Nav} />
          <Route exact path='/' component={Fruits} />
          <Route path='/register' component={Register} />
          <Route path='/signin' component={SignIn} />
        </Router>
      </React.Fragment>
    )
  }
}

export default App
