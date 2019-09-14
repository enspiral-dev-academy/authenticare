# `generateHash`

## Overview

Generates a binary hash from the string provided.


## Parameters

- `password`: string


## Returns

A Promise that resolves to the binary hash.


## Example

```js
const connection = require('./connection')
const { generateHash } = require('authenticare/server')

module.exports = {
  createUser
}

function createUser (username, password, db = connection) {
  return userExists(username, db)
    .then(exists => {
      if (exists) {
        return Promise.reject(new Error('User exists'))
      }
    })
    .then(() => generateHash(password))
    .then(passwordHash => {
      return db('users').insert({ username, hash: passwordHash })
    })
}
```
