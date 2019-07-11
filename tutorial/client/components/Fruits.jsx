import React from 'react'

import { GridForm, ColOne, ColTwo, Button } from './Styled'

import {
  getFruits,
  addFruit,
  updateFruit,
  deleteFruit
} from '../api'

class App extends React.Component {
  state = {
    fruits: [],
    adding: {},
    editing: {}
  }

  handleEditChange = e => {
    this.setState({
      editing: {
        ...this.state.editing,
        [e.target.name]: e.target.value
      }
    })
  }

  handleAddChange = e => {
    this.setState({
      adding: {
        ...this.state.adding,
        [e.target.name]: e.target.value
      }
    })
  }

  getSelectHandler = id => {
    const { fruits } = this.state
    return e => {
      e.preventDefault()
      this.setState({
        editing: fruits.find(fruit => fruit.id === id)
      })
    }
  }

  clearSelected = () => {
    this.setState({
      editing: {}
    })
  }

  handleUpdate = () => {
    updateFruit(this.state.editing)
      .then(fruits => {
        this.setState({
          fruits,
          editing: {}
        })
      })
  }

  handleDelete = () => {
    deleteFruit(this.state.editing.id)
      .then(fruits => {
        this.setState({
          fruits,
          editing: {}
        })
      })
  }

  handleAdd = () => {
    const newFruit = { ...this.state.adding }
    addFruit(newFruit)
      .then(fruits => {
        this.setState({
          fruits,
          adding: {}
        })
      })
  }

  componentDidMount () {
    getFruits()
      .then(fruits => {
        this.setState({ fruits })
      })
  }

  render () {
    const { name: addingName, calories: addingCalories } = this.state.adding
    const { name: editingName, calories: editingCalories } = this.state.editing
    return (
      <React.Fragment>
        <ul>
          {this.state.fruits.map(fruit => (
            <li key={fruit.id}>
              <a href='#'
                data-testid='fruit-link'
                onClick={this.getSelectHandler(fruit.id)}>
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
            onChange={this.handleEditChange} />

          <ColOne>Calories:</ColOne>
          <ColTwo name='calories'
            data-testid='selected-calories'
            value={editingCalories || ''}
            onChange={this.handleEditChange} />

          <Button type='button'
            data-testid='update-button'
            onClick={this.handleUpdate}>Update fruit</Button>
          <Button type='button'
            data-testid='delete-button'
            onClick={this.handleDelete}>Delete fruit</Button>
          <Button type='button'
            data-testid='clear-button'
            onClick={this.clearSelected}>Clear selection</Button>
        </GridForm>

        <h2>Add new</h2>
        <GridForm>
          <ColOne>Name:</ColOne>
          <ColTwo name='name'
            value={addingName || ''}
            onChange={this.handleAddChange} />

          <ColOne>Calories:</ColOne>
          <ColTwo name='calories'
            value={addingCalories || ''}
            onChange={this.handleAddChange} />

          <Button type='button' onClick={this.handleAdd}>Add fruit</Button>
        </GridForm>
      </React.Fragment>
    )
  }
}

export default App
