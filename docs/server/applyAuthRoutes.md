# `applyAuthRoutes`

## Overview

Adds two routes to the router supplied.

- POST `/auth/register`
- POST `/auth/signin`


## Parameters

- `router`: instance of `require('express').Router()`
- `options`: object with the following properties
    - `userExists`: function that accepts nothing and returns a Promise that resolves to a boolean
    - `createUser`: function that accepts a `user` object and returns a Promise with an insignificant resolution - the `user` object passed to this function is the same object you pass to `authenticare/client/register` and it must have a `username` property
    - `getUserByName`: function that accepts a username as a string and returns a Promise that resolves to an object - the object must have a `hash` property


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
