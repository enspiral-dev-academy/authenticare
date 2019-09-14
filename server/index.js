const hash = require('./hash')
const token = require('./token')
const routes = require('./routes')

module.exports = {
  decodeToken: token.decode,
  getTokenDecoder: token.getTokenDecoder,
  applyAuthRoutes: routes.applyAuthRoutes,
  generateHash: hash.generate,
  verifyHash: hash.verify
}
