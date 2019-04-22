const jwt = require('jsonwebtoken')
const verifyJwt = require('express-jwt')

const jwtTestSecret = require('../tests/jwt-test-secret')

module.exports = {
  decode,
  getIssuer,
  createToken // exported for testing
}

function getIssuer (getUserByName) {
  return function (req, res) {
    getUserByName(req.body.username)
      .then(user => {
        const token = createToken(user, process.env.JWT_SECRET)
        res.json({
          message: 'Authentication successful.',
          token
        })
      })
  }
}

function decode (req, res, next) {
  verifyJwt({
    secret: getSecret
  })(req, res, next)
}

function createToken (user, secret) {
  return jwt.sign({
    id: user.id,
    username: user.username
  }, secret, {
    expiresIn: '1d'
  })
}

function getSecret (req, payload, done) {
  const secret = process.env.JWT_SECRET || jwtTestSecret
  if (secret === jwtTestSecret) {
    // console.warn('ATTENTION: Using the JWT Test secret')
  }
  done(null, secret)
}
