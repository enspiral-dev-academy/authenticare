# `getEncodedToken`

## Overview

Returns the encoded token saved in localStorage in the browser.


## Parameters

_none_


## Returns

`string`: the base64 encoded token


## Example

```js
import request from 'superagent'
import { getEncodedToken } from 'authenticare/client'

const rootUrl = '/api/v1/fruits'

export function addFruit (fruit, url = rootUrl) {
  return request.post(url)
    .set({ 'Accept': 'application/json' })
    .set({ 'Authorization': `Bearer ${getEncodedToken()}` })
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}
```
