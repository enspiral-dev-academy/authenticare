const consume = require('./consume')
const endpoints = require('../endpoints')
const { saveAuthToken } = require('./auth')

module.exports = function (endpoint, data, request = consume) {
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
        const errMessage = err.response?.body?.error?.title
        reject(new Error(errMessage || err.message))
      })
  })
}

// Ensures the endpoint matches one of the known endpoints
function verifyEndpoint (endpoint) {
  const foundMatch = Object.values(endpoints).includes(endpoint)
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
