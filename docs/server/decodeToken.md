# `decodeToken`

> **IMPORTANT** This function has been deprecated and will be removed in version 0.5.0. You should use [`getTokenDecoder`](getTokenDecoder.md) instead.

## Overview

This Express middleware function reads the `Authorization` header off of the HTTP request and decodes it. It then places the contents of the token on the `req.user` property.


## Parameters

`req`: Express Request object
`res`: Express Response object
`next`: Function: used to call the middleware


## Returns

_`undefined`_


## Example

```js
const { decodeToken } = require('authenticare/server')
const db = require('../db/db')

// POST /api/v1/fruits
router.post('/', decodeToken, async (req, res) => {
  const newFruit = req.body
  try {
    const fruits = await db.addFruit(newFruit)
    res.json({ fruits })
  } catch (err) {
    res.status(500).send(err.message)
  }
})
```
