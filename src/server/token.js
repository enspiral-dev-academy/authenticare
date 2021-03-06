const jwt = require('jsonwebtoken')
const verifyJwt = require('express-jwt')

const testSecret = 'this-is-a-test-secret'

module.exports = {
  decode,
  getIssuer,
  createToken,
  getTokenDecoder
}

function getIssuer (getUserByName) {
  if (!process.env.JWT_SECRET) throw new Error('Authenticare needs a JWT_SECRET environment variable.  Add it to your .env file or wherever you keep your environment variables.')
  return function (req, res) {
    return getUserByName(req.body.username)
      .then(user => {
        const token = createToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRE_TIME)
        res.json({
          message: 'Authentication successful.',
          token
        })
        return null
      })
  }
}

function getTokenDecoder (throwNoTokenError = true) {
  return (req, res, next) => {
    verifyJwt({
      secret: getSecret,
      algorithms: ['HS256'],
      credentialsRequired: throwNoTokenError
    })(req, res, next)
  }
}

function decode (req, res, next) {
  // eslint-disable-next-line no-console
  console.warn('authenticare/server:',
    'decodeToken has been deprecated and will be removed in v0.5.0.',
    'Recommend using getTokenDecoder instead. See docs for use.')
  verifyJwt({
    secret: getSecret
  })(req, res, next)
}

function createToken (user, secret, expireTime) {
  const token = { ...user }
  delete token.hash
  return jwt.sign(token, secret, { expiresIn: expireTime || '1d' })
}

function getSecret (req, payload, done) {
  const secret = process.env.JWT_SECRET || testSecret
  if (secret === testSecret) {
    // eslint-disable-next-line no-console
    // console.warn('ATTENTION: Using the JWT Test secret')
  }
  done(null, secret)
}
