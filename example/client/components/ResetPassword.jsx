import React, { useState } from 'react'
import { resetPassword, isAuthenticated } from 'authenticare/client'

import { baseApiUrl as baseUrl } from '../config'
import { GridForm, ColOne, ColTwo, Button, Error } from './Styled'

function ResetPassword (props) {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  function handleChange (e) {
    setEmail(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    return resetPassword(email, { baseUrl })
      .then((token) => {
        if (isAuthenticated()) {
          props.history.push('/')
        }
        return null
      })
  }

  return (
    <>
      <Error onClick={hideError}>
        { error && `Error: ${error}` }
      </Error>
      <h2>Reset Password</h2>
      <GridForm onSubmit={handleSubmit}>
        <ColOne htmlFor='email'>Email:</ColOne>
        <ColTwo type='text' required
          id='email'
          name='email'
          value={email}
          onChange={handleChange} />

        <Button>Reset password</Button>
      </GridForm>
    </>
  )
}

export default ResetPassword
