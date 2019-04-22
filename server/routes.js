const hash = require('./hash')
const token = require('./token')

module.exports = {
  applyAuthRoutes
}

// TODO: Refactor this function
function applyAuthRoutes (router, functions) {
  const issueToken = token.getIssuer(functions.getUserByName)

  router.post('/register', register, issueToken)
  router.post('/signin', signIn, issueToken)

  function register (req, res, next) {
    functions.userExists(req.body.username)
      .then(exists => {
        if (exists) {
          return res.status(400).send({
            errorType: 'USERNAME_UNAVAILABLE'
          })
        }
        functions.createUser(req.body.username, req.body.password)
          .then(() => next())
      })
      .catch(() => {
        res.status(400).send({
          errorType: 'DATABASE_ERROR'
        })
      })
  }

  function signIn (req, res, next) {
    functions.getUserByName(req.body.username)
      .then(user => {
        return user || invalidCredentials(res)
      })
      .then(user => {
        return user && hash.verify(user.hash, req.body.password)
      })
      .then(isValid => {
        return isValid ? next() : invalidCredentials(res)
      })
      .catch(() => {
        res.status(400).send({
          errorType: 'DATABASE_ERROR'
        })
      })
  }

  function invalidCredentials (res) {
    res.status(400).send({
      errorType: 'INVALID_CREDENTIALS'
    })
  }
}
