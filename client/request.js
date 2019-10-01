const request = require('superagent')

const { saveAuthToken } = require('./auth')
const endpoints = require('../endpoints')

module.exports = function (endpoint, data) {
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

    request.post(endpoint)
      .set(headers)
      .send(data)
      .then(res => resolve(saveAuthToken(res.body.token)))
      .catch(err => reject(err))
  })
}

// Ensures the endpoint matches one of the known endpoints
function verifyEndpoint (endpoint) {
  let matchFound = false

  for (let ep of Object.values(endpoints)) {
    matchFound = matchFound || endpoint.includes(ep)
  }

  if (!matchFound) {
    throw new Error('endpoint does not match any of the known endpoints')
  }
}

function verifyData (data) {
  if (!data) {
    throw new Error('data parameter is required')
  }

  if (!data.username) {
    throw new Error('data parameter must have a username property')
  }
}
