import React, { useState } from 'react'
import { signIn, isAuthenticated } from 'authenticare/client'

import { baseApiUrl as baseUrl } from '../config'
import { GridForm, ColOne, ColTwo, Button } from './Styled'

function SignIn (props) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleClick = () => {
    const { username, password } = form
    return signIn({ username, password }, { baseUrl })
      .then((token) => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
        return null
      })
  }

  return (
    <>
      <h2>Sign in</h2>
      <GridForm>
        <ColOne htmlFor='username'>Username:</ColOne>
        <ColTwo type='text' required
          id='username'
          name='username'
          value={form.username}
          onChange={handleChange} />

        <ColOne htmlFor='password'>Password:</ColOne>
        <ColTwo type='password' required
          id='password'
          name='password'
          value={form.password}
          onChange={handleChange}
          autocomplete='current-password' />

        <Button type='button' onClick={handleClick}>Sign in</Button>
      </GridForm>
    </>
  )
}

export default SignIn
