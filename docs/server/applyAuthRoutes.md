# `applyAuthRoutes`

## Overview

Adds two routes to the router supplied.

- POST `/auth/register`
- POST `/auth/signin`


## Parameters

- `router`: instance of `require('express').Router()`
- `options`: object with the following properties
    - `userExists`: function that returns a Promise that resolves to a boolean
    - `createUser`: function that returns a Promise with an insignificant resolution
    - `getUserByName`: function that returns a Promise that resolves to an object - the object must have a `hash` property


## Returns

_`undefined`_


## Example

```js
const express = require('express')
const { applyAuthRoutes } = require('authenticare/server')

const {
  userExists,
  getUserByName,
  createUser } = require('../db/users')

const router = express.Router()

applyAuthRoutes(router, {
  userExists,
  getUserByName,
  createUser
})

module.exports = router
```
