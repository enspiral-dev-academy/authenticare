# `register`

## Overview

POSTs a new user registration request to the `/auth/register` route on the server.


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
import { register, isAuthenticated } from 'authenticare/client'

import { GridForm, ColOne, ColTwo, Button, Error } from './Styled'

export default function Register (props) {
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
    register({ username, password })
      .then(() => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
      })
      .catch(err => {
        if (err.message === 'USERNAME_UNAVAILABLE') {
          setError('Username is not available')
        }
      })
  }

  return (
    <>
      <Error onClick={hideError}>
        { error && `Error: ${error}` }
      </Error>
      <h2>Register</h2>
      <GridForm onSubmit={handleSubmit}>
        <ColOne>Username:</ColOne>
        <ColTwo name='username'
          value={form.username}
          onChange={handleChange} />

        <ColOne>Password:</ColOne>
        <ColTwo name='password' type='password'
          value={form.password}
          onChange={handleChange} />

        <Button>Register</Button>
      </GridForm>
    </>
  )
}
```
