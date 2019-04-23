const request = require('superagent')

const { saveAuthToken } = require('./auth')

module.exports = function (endpoint, data = {}) {
  const headers = {
    Accept: 'application/json'
  }

  return request.post(endpoint)
    .set(headers)
    .send(data)
    .then(res => saveAuthToken(res.body.token))
}
