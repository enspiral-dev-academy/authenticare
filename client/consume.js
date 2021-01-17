const request = require('superagent')

module.exports = function consume (endpoint, headers, data = {}) {
  return request.post(endpoint).set(headers).save(data)
}
