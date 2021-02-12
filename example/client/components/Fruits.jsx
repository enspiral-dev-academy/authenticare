import React, { useState, useEffect } from 'react'

import { IfAuthenticated } from './Authenticated'
import { GridForm, ColOne, ColTwo, Button, Error } from './Styled'

import {
  getFruits,
  addFruit,
  updateFruit,
  deleteFruit
} from '../api'

function Fruits () {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState([])
  const [adding, setAdding] = useState({})
  const [editing, setEditing] = useState({})

  const handleEditChange = e => {
    const { name, value } = e.target
    setEditing({
      ...editing,
      [name]: value
    })
  }

  const handleAddChange = e => {
    const { name, value } = e.target
    setAdding({
      ...adding,
      [name]: value
    })
  }

  const getSelectHandler = id => {
    return e => {
      e.preventDefault()
      setEditing(fruits.find(fruit => fruit.id === id))
    }
  }

  const clearSelected = () => {
    setEditing({})
  }

  const handleUpdate = () => {
    updateFruit(editing)
      .then(remoteFruits => {
        setFruits(remoteFruits)
        setEditing({})
        setError('')
        return null
      })
      .catch(err => {
        setError(err.message)
      })
  }

  const handleDelete = () => {
    deleteFruit(editing.id)
      .then(setFruits)
      .then(() => setEditing({}))
      .then(() => setError(''))
      .catch(err => setError(err.message))
  }

  const handleAdd = () => {
    const newFruit = { ...adding }
    addFruit(newFruit)
      .then(setFruits)
      .then(() => setAdding({}))
      .catch(err => setError(err.message))
  }

  const hideError = () => {
    setError('')
  }

  useEffect(() => {
    getFruits()
      .then(remoteFruits => {
        setFruits(remoteFruits)
        return null
      })
      .catch(err => setError(err.message))
  }, [])

  const { name: addingName, calories: addingCalories } = adding
  const { name: editingName, calories: editingCalories } = editing

  return (
    <>
      <Error onClick={hideError}>
        { error && `Error: ${error}` }
      </Error>
      <ul>
        {fruits.map(fruit => (
          <li key={fruit.id}>
            <a href='#'
              data-testid='fruit-link'
              onClick={getSelectHandler(fruit.id)}>
              {fruit.name}
            </a>
          </li>
        ))}
      </ul>

      <h2>Selected</h2>
      <GridForm>
        <ColOne>Name:</ColOne>
        <ColTwo type='text'
          name='name'
          aria-label='selected-name'
          data-testid='selected-name'
          value={editingName || ''}
          onChange={handleEditChange} />

        <ColOne>Calories:</ColOne>
        <ColTwo type='text'
          name='calories'
          aria-label='selected-calories'
          data-testid='selected-calories'
          value={editingCalories || ''}
          onChange={handleEditChange} />

        <IfAuthenticated>
          <Button type='button'
            data-testid='update-button'
            onClick={handleUpdate}>Update fruit</Button>
          <Button type='button'
            data-testid='delete-button'
            onClick={handleDelete}>Delete fruit</Button>
        </IfAuthenticated>
        <Button type='button'
          data-testid='clear-button'
          onClick={clearSelected}>Clear selection</Button>
      </GridForm>

      <IfAuthenticated>
        <h2>Add new</h2>
        <GridForm>
          <ColOne>Name:</ColOne>
          <ColTwo type='text'
            name='name'
            aria-label='adding-name'
            value={addingName || ''}
            onChange={handleAddChange} />

          <ColOne>Calories:</ColOne>
          <ColTwo type='text'
            name='calories'
            aria-label='adding-calories'
            value={addingCalories || ''}
            onChange={handleAddChange} />

          <Button type='button' onClick={handleAdd}>Add fruit</Button>
        </GridForm>
      </IfAuthenticated>
    </>
  )
}

export default Fruits
