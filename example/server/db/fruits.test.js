require('core-js/stable')
require('regenerator-runtime/runtime')
const env = require('./test-environment')
const db = require('./fruits')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

test('getFruits returns all fruits', () => {
  return db.getFruits(testDb)
    .then(fruits => {
      expect(fruits).toHaveLength(3)
      return null
    })
})

test('addFruit adds a fruit', () => {
  const fruit = {
    name: 'papaya',
    calories: 26
  }
  const user = { id: 5 }
  return db.addFruit(fruit, user, testDb)
    .then(fruits => {
      expect(fruits).toHaveLength(4)
      return null
    })
})

test('updateFruit updates a fruit', () => {
  const fruit = {
    id: 3,
    name: 'papaya',
    calories: 26
  }
  const user = { id: 1 }
  return db.updateFruit(fruit, user, testDb)
    .then(fruits => {
      expect(fruits[2].name).toBe(fruit.name)
      return null
    })
})

test('updateFruit fails if not originating user', () => {
  const fruit = {
    id: 3,
    name: 'papaya',
    calories: 26
  }
  const user = { id: 2 }
  return db.updateFruit(fruit, user, testDb)
    .catch(err => {
      expect(err.message).toBe('Unauthorized')
    })
})

test('deleteFruit deletes a fruit', () => {
  const user = { id: 2 }
  return db.deleteFruit(2, user, testDb)
    .then(fruits => {
      expect(fruits).toHaveLength(2)
      return null
    })
})

test('deleteFruit fails if not originating user', () => {
  const user = { id: 1 }
  return db.deleteFruit(2, user, testDb)
    .catch(err => {
      expect(err.message).toBe('Unauthorized')
    })
})
