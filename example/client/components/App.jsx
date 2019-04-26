import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Nav from './Nav'
import Fruits from './Fruits'
import Register from './Register'
import SignIn from './SignIn'

export default function App () {
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
