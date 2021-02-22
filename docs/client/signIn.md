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

import { GridForm, ColOne, ColTwo, Button, Error } from './Styled'

export default function SignIn (props) {
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const hideError = () => {
    setError('')
  }

  function handleChange (e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    const { username, password } = form
    signIn({ username, password })
      .then(() => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
      })
      .catch(err => {
        if (err.message === 'INVALID_CREDENTIALS') {
          setError('Username and password combination not found')
        }
      })
  }

  return (
    <>
      <Error onClick={hideError}>
        { error && `Error: ${error}` }
      </Error>
      <h2>Sign in</h2>
      <GridForm onSubmit={handleSubmit}>
        <ColOne>Username:</ColOne>
        <ColTwo name='username'
          value={form.username}
          onChange={handleChange} />

        <ColOne>Password:</ColOne>
        <ColTwo name='password' type='password'
          value={form.password}
          onChange={handleChange} />

        <Button>Sign in</Button>
      </GridForm>
    </>
  )
}
```
