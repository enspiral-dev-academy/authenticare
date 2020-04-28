import React, { useState } from 'react'
import { signIn, isAuthenticated } from 'authenticare/client'

import { GridForm, ColOne, ColTwo, Button } from './Styled'

function SignIn (props) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    const {name, value} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleClick = () => {
    const {username, password} = form
    signIn({ username, password }, {
      baseUrl: process.env.BASE_API_URL // see .env and webpack.config.js
    })
      .then((token) => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
      })
  }

  return (
    <>
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
    </>
  )
}

export default SignIn
