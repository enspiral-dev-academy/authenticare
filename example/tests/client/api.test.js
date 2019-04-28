import {
  getFruits,
  addFruit,
  updateFruit,
  deleteFruit
} from '../../client/api'

describe('Client side API client', () => {
  it.skip('getFruits returns a list of fruits', () => {
    getFruits()
      .then(() => {})
  })

  it.skip('addFruit adds a fruit', () => {
    const fruit = {}
    addFruit(fruit)
      .then(() => {})
  })

  it.skip('updateFruit updates a fruit', () => {
    const fruit = {}
    updateFruit(fruit)
      .then(() => {})
  })

  it.skip('deleteFruit deletes a fruit', () => {
    const fruit = {}
    deleteFruit(fruit)
      .then(() => {})
  })
})
