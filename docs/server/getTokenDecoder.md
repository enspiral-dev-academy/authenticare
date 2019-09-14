# `getTokenDecoder`

## Overview

This Express middleware function reads the `Authorization` header off of the HTTP request and decodes it. It then places the contents of the token on the `req.user` property.


## Parameters

`throwNoTokenError`: A boolean that determines if a route will allow the absence of a token. The default is true, so it will throw an error if a token is not found in the `Authorization` header.


## Returns

`function`: An Express middleware function reads the `Authorization` header off of the HTTP request and decodes it. It then places the contents of the token on the `req.user` property.


## Example

```js
const { getTokenDecoder } = require('authenticare/server')
const db = require('../db/db')

const tokenDecoder = getTokenDecoder(false)

// POST /api/v1/fruits
router.post('/', tokenDecoder, async (req, res) => {
  const newFruit = req.body

  if (req.user) {
    console.log('username:', req.user.username)
  } else {
    console.log('authenication token not provided')
  }

  try {
    const fruits = await db.addFruit(newFruit)
    res.json({ fruits })
  } catch (err) {
    res.status(500).send(err.message)
  }
})
```
