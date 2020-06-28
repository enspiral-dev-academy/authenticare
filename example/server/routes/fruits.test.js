require('dotenv').config()
require('core-js/stable')
require('regenerator-runtime/runtime')
const request = require('supertest')

const server = require('../server')

jest.mock('../db/users')
jest.mock('../db/fruits')
const db = require('../db/fruits') // the mock

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
    return getTestToken(server)
      .then(token => {
        return request(server)
          .post('/api/v1/fruits')
          .set('Authorization', `Bearer ${token}`)
          .send({ name: 'durian', calories: 26 })
          .then(res => {
            expect(res.body.fruits).toHaveLength(4)
          })
      })
  })
})

describe('PUT /', () => {
  it('updates a fruit', () => {
    const newName = 'durian'

    return getTestToken(server)
      .then(token => {
        return request(server)
          .put('/api/v1/fruits')
          .set('Authorization', `Bearer ${token}`)
          .send({ id: 3, name: newName, calories: 26 })
          .then(res => {
            expect(res.body.fruits[2].name).toBe(newName)
          })
      })
  })
})

describe('DELETE /:id', () => {
  it('deletes the fruit', () => {
    return getTestToken(server)
      .then(token => {
        return request(server)
          .delete('/api/v1/fruits/1')
          .set('Authorization', `Bearer ${token}`)
          .then(res => {
            expect(res.body.fruits).toHaveLength(2)
          })
      })
  })
})

function getTestToken (srv) {
  return request(srv)
    .post('/api/v1/auth/signin')
    .send({username: 'jess', password: 'jess'})
    .then(res => res.body.token)
}
