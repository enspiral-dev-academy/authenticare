import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { setNewPassword } from 'authenticare/client'

import { baseApiUrl as baseUrl } from '../config'
import { GridForm, ColOne, ColTwo, Button, Error } from './Styled'

function NewPassword (props) {
  const { token } = useParams()
  const [error, setError] = useState('')
  const [form, setForm] = useState({ password1: '', password2: '' })

  function handleChange (e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleSubmit (e) {
    e.preventDefault()
    return setNewPassword(form.password1, form.password2, token, { baseUrl })
      .then(() => {
        props.history.push('/')
        return null
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  const hideError = () => {
    setError('')
  }

  return (
    <>
      <Error onClick={hideError}>
        { error && `Error: ${error}` }
      </Error>
      <h2>Enter New Password</h2>
      <GridForm onSubmit={handleSubmit}>
        <ColOne htmlFor='password1'>New password:</ColOne>
        <ColTwo type='password' required
          id='password1'
          name='password1'
          value={form.password1}
          onChange={handleChange} />

        <ColOne htmlFor='password2'>Confirm password:</ColOne>
        <ColTwo type='password' required
          id='password2'
          name='password2'
          value={form.password2}
          onChange={handleChange} />

        <Button>Set new password</Button>
      </GridForm>
    </>
  )
}

export default NewPassword
