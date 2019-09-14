const express = require('express')

const hash = require('./hash')
const token = require('./token')
const { registerUrl, signInUrl } = require('../endpoints')

const DATABASE_ERROR = 'DATABASE_ERROR'
const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'
const USERNAME_UNAVAILABLE = 'USERNAME_UNAVAILABLE'

module.exports = {
  applyAuthRoutes
}

// TODO: Refactor this function
function applyAuthRoutes (router, functions) {
  const issueToken = token.getIssuer(functions.getUserByName)

  router.use(express.json())
  router.post(registerUrl, register, issueToken)
  router.post(signInUrl, signIn, issueToken)

  function register (req, res, next) {
    functions.userExists(req.body.username)
      .then(exists => {
        if (exists) {
          return res.status(400).send({
            errorType: USERNAME_UNAVAILABLE
          })
        }
        functions.createUser(req.body)
          .then(() => next())
      })
      .catch(err => {
        res.status(500).send({
          errorType: DATABASE_ERROR,
          error: err.message
        })
      })
  }

  function signIn (req, res, next) {
    functions.getUserByName(req.body.username)
      .then(user => {
        if (user) return user
        throw new Error(INVALID_CREDENTIALS)
      })
      .then(user => {
        return user && hash.verify(user.hash, req.body.password)
      })
      .then(isValid => {
        if (isValid) return next()
        throw new Error(INVALID_CREDENTIALS)
      })
      .catch(err => {
        if (err.message === INVALID_CREDENTIALS) {
          return res.status(400).send({
            errorType: INVALID_CREDENTIALS
          })
        }

        res.status(500).send({
          errorType: DATABASE_ERROR,
          error: err.message
        })
      })
  }
}
