import React, { useState } from 'react'

import { GridForm, ColOne, ColTwo, Button } from './Styled'

export default function SignIn () {
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
    // dispatch sign in
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

        <Button onClick={handleClick}>Sign in</Button>
      </GridForm>
    </React.Fragment>
  )
}
