# `signIn`

## Overview

POSTs a new user registration request to the `/auth/signin` route on the server.


## Parameters

`user`: object with at least two string properties:
    - `username`: string
    - `password`: string
`options`: optional object to configure request
    - `baseUrl`: string (e.g. `http://localhost:3000/api/v1`)


## Returns

Promise that resolves to the decoded token.


## Example

```js
import React, { useState } from 'react'
import { signIn, isAuthenticated } from 'authenticare/client'

import { GridForm, ColOne, ColTwo, Button } from './Styled'

export default function SignIn (props) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = () => {
    signIn({
      username: form.username,
      password: form.password
    })
      .then(() => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
      })
  }

  return (
    <React.Fragment>
      <h2>Sign in</h2>
      <GridForm>
        <ColOne>Username:</ColOne>
        <ColTwo name='username'
          value={form.username}
          onChange={handleChange} />

        <ColOne>Password:</ColOne>
        <ColTwo name='password' type='password'
          value={form.password}
          onChange={handleChange} />

        <Button type='button' onClick={handleClick}>Sign in</Button>
      </GridForm>
    </React.Fragment>
  )
}
```
