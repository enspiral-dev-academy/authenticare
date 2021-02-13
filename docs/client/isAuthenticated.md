# `isAuthenticated`

## Overview

Returns a boolean based on if the user has been authenticated.


## Parameters

_none_


## Returns

`boolean`

- `true` if the user has been authenticated
- `false` if the user has not been authenticated


## Example

```js
import React from 'react'
import { isAuthenticated } from 'authenticare/client'

export function IfAuthenticated ({ children }) {
  return isAuthenticated() ? children : null
}

export function IfNotAuthenticated ({ children }) {
  return !isAuthenticated() ? children : null
}
```
