import request from 'superagent'
import { getAuthorizationHeader } from 'authenticare/client'

const rootUrl = '/api/v1/fruits'
const acceptJsonHeader = { 'Accept': 'application/json' }

export function getFruits () {
  return request.get(rootUrl)
    .set(acceptJsonHeader)
    .then(res => {
      return res.body.fruits
    })
    .catch(logError)
}

export function addFruit (fruit) {
  return request.post(rootUrl)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function updateFruit (fruit) {
  return request.put(rootUrl)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function deleteFruit (id) {
  return request.delete(`${rootUrl}/${id}`)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .then(res => res.body.fruits)
    .catch(logError)
}

function logError (err) {
  if (err.message === 'Forbidden') {
    throw new Error('Only the user who added the fruit may update and delete it')
  } else {
    // eslint-disable-next-line no-console
    console.error(
      'Error consuming the API (in client/api.js):',
      err.message
    )
    throw err
  }
}
