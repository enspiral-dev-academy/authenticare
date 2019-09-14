const token = require('../../server/token')
const testSecret = require('./testSecret')

module.exports = function (subject) {
  return token.createToken(subject, testSecret)
}
