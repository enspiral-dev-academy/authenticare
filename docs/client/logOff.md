# `logOff`

## Overview

Logs off the user by deleting the `token` field in the browser's localStorage.


## Parameters

_none_


## Returns

_`undefined`_


## Example

```js
import React from 'react'
import { Link } from 'react-router-dom'
import { logOff } from 'authenticare/client'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export default function Nav () {
  return (
    <React.Fragment>
      <div>
        <Link to='/'>Home</NavLink>
        <IfAuthenticated>
          <Link to='#' onClick={logOff}>Log off</Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link to='/register'>Register</Link>
          <Link to='/signin'>Sign in</Link>
        </IfNotAuthenticated>
      </div>
      <h1>Fruit FTW!</h1>
    </React.Fragment>
  )
}
```

