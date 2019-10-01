require('babel-polyfill')
const request = require('supertest')

const server = require('../../server/server')
const authTesting = require('authenticare/testing/server')

jest.mock('../../server/db/db')
const db = require('../../server/db/db') // the mock

beforeEach(() => {
  db.reset()
})

describe('GET /', () => {
  it('returns all the fruits', () => {
    return request(server)
      .get('/api/v1/fruits')
      .then(res => {
        expect(res.body.fruits).toHaveLength(3)
      })
  })
})

describe('POST /', () => {
  it('adds a new fruit', () => {
    authTesting.useToken(true, {
      id: 3,
      username: 'testuser3'
    })
    return request(server)
      .post('/api/v1/fruits')
      .send({ name: 'durian', calories: 26 })
      .then(res => {
        expect(res.body.fruits).toHaveLength(4)
      })
  })
})

describe('PUT /', () => {
  it('updates a fruit', () => {
    const newName = 'durian'
    authTesting.useToken(true, {
      id: 4,
      username: 'testuser4'
    })

    return request(server)
      .put('/api/v1/fruits')
      .send({ id: 3, name: newName, calories: 26 })
      .then(res => {
        expect(res.body.fruits[2].name).toBe(newName)
      })
  })

  it('prevents update from different user', () => {
    expect.assertions(1)
    const newName = 'durian'
    authTesting.useToken(false)

    return request(server)
      .put('/api/v1/fruits')
      .send({ id: 3, name: newName, calories: 26 })
      .then(res => {
        console.log('update res.text', res.text)
        expect(res.status).toBe(403)
      })
  })
})

describe('DELETE /:id', () => {
  it('deletes the fruit', () => {
    authTesting.useToken(true, {
      id: 2,
      username: 'testuser2'
    })

    return request(server)
      .delete('/api/v1/fruits/2')
      .then(res => {
        expect(res.body.fruits).toHaveLength(2)
      })
  })

  it('prevents deletion from a different user', () => {
    expect.assertions(1)
    authTesting.useToken(false)

    return request(server)
      .delete('/api/v1/fruits/2')
      .then(res => {
        console.log('delete res.text', res.text)
        expect(res.status).toBe(403)
      })
  })
})
