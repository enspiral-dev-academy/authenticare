# `getAuthorizationHeader`

## Overview

Returns an `Authorization` HTTP header with a `Bearer` token value that includes the encoded token saved in localStorage in the browser.


## Parameters

_none_


## Returns

`object`: `{ 'Authorization': 'Bearer <encoded_token>' }`


## Example

```js
import request from 'superagent'
import { getAuthorizationHeader } from 'authenticare/client'

const rootUrl = '/api/v1/fruits'
const acceptJsonHeader = { 'Accept': 'application/json' }

export function addFruit (fruit, url = rootUrl) {
  return request.post(url)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}
```
