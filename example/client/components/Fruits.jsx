import React, { useState, useEffect } from 'react'

import { IfAuthenticated } from './Authenticated'
import { GridForm, ColOne, ColTwo, Button, Error } from './Styled'

import {
  getFruits,
  addFruit,
  updateFruit,
  deleteFruit
} from '../api'

export default function Fruits () {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState([])
  const [adding, setAdding] = useState({})
  const [editing, setEditing] = useState({})

  const handleEditChange = e => {
    setEditing({
      ...editing,
      [e.target.name]: e.target.value
    })
  }

  const handleAddChange = e => {
    setAdding({
      ...adding,
      [e.target.name]: e.target.value
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
      })
      .catch(err => {
        setError(err.message)
      })
  }

  const handleDelete = () => {
    deleteFruit(editing.id)
      .then(remoteFruits => {
        setFruits(remoteFruits)
        setEditing({})
        setError('')
      })
      .catch(err => {
        setError(err.message)
      })
  }

  const handleAdd = () => {
    const newFruit = { ...adding }
    addFruit(newFruit)
      .then(remoteFruits => {
        setFruits(remoteFruits)
        setAdding({})
      })
  }

  const hideError = () => {
    setError('')
  }

  useEffect(() => {
    getFruits()
      .then(remoteFruits => {
        setFruits(remoteFruits)
      })
  }, [])

  const { name: addingName, calories: addingCalories } = adding
  const { name: editingName, calories: editingCalories } = editing

  return (
    <React.Fragment>
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
        <ColTwo name='name'
          data-testid='selected-name'
          value={editingName || ''}
          onChange={handleEditChange} />

        <ColOne>Calories:</ColOne>
        <ColTwo name='calories'
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
          <ColTwo name='name'
            value={addingName || ''}
            onChange={handleAddChange} />

          <ColOne>Calories:</ColOne>
          <ColTwo name='calories'
            value={addingCalories || ''}
            onChange={handleAddChange} />

          <Button type='button' onClick={handleAdd}>Add fruit</Button>
        </GridForm>
      </IfAuthenticated>
    </React.Fragment>
  )
}
