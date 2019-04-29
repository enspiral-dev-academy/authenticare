import request from 'superagent'
import { getEncodedToken } from 'authenticare/client'

const rootUrl = '/api/v1/fruits'

export function getFruits (url = rootUrl) {
  return request.get(url)
    .set({ 'Accept': 'application/json' })
    .then(res => {
      return res.body.fruits
    })
    .catch(logError)
}

export function addFruit (fruit, url = rootUrl) {
  const token = getEncodedToken()
  return request.post(url)
    .set({ 'Accept': 'application/json' })
    .set({ 'Authorization': `Bearer ${token}` })
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function updateFruit (fruit, url = rootUrl) {
  const token = getEncodedToken()
  return request.put(url)
    .set({ 'Accept': 'application/json' })
    .set({ 'Authorization': `Bearer ${token}` })
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function deleteFruit (id, url = rootUrl) {
  const token = getEncodedToken()
  return request.delete(`${url}/${id}`)
    .set({ 'Accept': 'application/json' })
    .set({ 'Authorization': `Bearer ${token}` })
    .then(res => res.body.fruits)
    .catch(logError)
}

function logError (err) {
  // eslint-disable-next-line no-console
  console.error(
    'Error consuming the API (in client/api.js):',
    err.message
  )
}
