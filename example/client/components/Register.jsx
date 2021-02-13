import React, { useState } from 'react'
import { register, isAuthenticated } from 'authenticare/client'

import { baseApiUrl as baseUrl } from '../config'
import { GridForm, ColOne, ColTwo, Button } from './Styled'

function Register (props) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

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
    return register({ username, password }, { baseUrl })
      .then((token) => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
        return null
      })
  }

  return (
    <>
      <h2>Register</h2>
      <GridForm onSubmit={handleSubmit}>
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
          autocomplete='new-password' />

        <Button>Register</Button>
      </GridForm>
    </>
  )
}

export default Register
