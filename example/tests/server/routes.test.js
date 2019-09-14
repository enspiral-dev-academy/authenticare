require('babel-polyfill')
const request = require('supertest')

const server = require('../../server/server')
const authTesting = require('authenticare/testing/server')

jest.mock('../../server/db/db')
const db = require('../../server/db/db') // the mock

beforeEach(() => {
  db.reset()
})

test('GET / returns all the fruits', () => {
  return request(server)
    .get('/api/v1/fruits')
    .then(res => {
      expect(res.body.fruits).toHaveLength(3)
    })
})

test('POST / adds a new fruit', () => {
  authTesting.allowTokens(true) // the default
  return request(server)
    .post('/api/v1/fruits')
    .send({ name: 'durian', calories: 26 })
    .then(res => {
      expect(res.body.fruits).toHaveLength(4)
    })
})

test('PUT / updates a fruit', () => {
  const newName = 'durian'
  return request(server)
    .put('/api/v1/fruits')
    .send({ id: 3, name: newName, calories: 26 })
    .then(res => {
      expect(res.body.fruits[2].name).toBe(newName)
    })
})

test('DELETE /:id deletes the fruit', () => {
  return request(server)
    .delete('/api/v1/fruits/2')
    .then(res => {
      expect(res.body.fruits).toHaveLength(2)
    })
})
