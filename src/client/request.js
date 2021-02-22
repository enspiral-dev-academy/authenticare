import consume from './consume'
import endpoints from '../endpoints'
import { saveAuthToken } from './auth'

export default function (endpoint, data, request = consume) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  return new Promise((resolve, reject) => {
    try {
      verifyEndpoint(endpoint)
      verifyData(data)
    } catch (err) {
      reject(err)
    }

    request(endpoint, headers, data)
      .then((res) => resolve(saveAuthToken(res.body?.token)))
      .catch((err) => {
        const authErrorMessage = err.response?.body?.errorType
        const errMessage = err.response?.body?.error?.title
        reject(new Error(authErrorMessage || errMessage || err.message))
      })
  })
}

// Ensures the endpoint matches one of the known endpoints
function verifyEndpoint (endpoint) {
  const foundMatch = Object.values(endpoints).some(ep => {
    return endpoint.includes(ep)
  })
  if (!foundMatch) {
    throw new Error('Endpoint does not match any of the known endpoints')
  }
}

function verifyData (data) {
  if (!data) {
    throw new Error('Data parameter is required')
  }

  if (!data.username) {
    throw new Error('Data parameter must have a username property')
  }
}
