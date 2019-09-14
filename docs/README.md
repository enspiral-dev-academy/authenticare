# Authenticare Documentation

Authenticare assumes a very specific web application architecture. The [example](/example) in this repo is a reference of that architecture. Basically, a Single Page Application (SPA) with a robust frontend (probably using React, Vue, Angular, etc) communicating with a REST Web API whose routes require authenticated users, assumably with different roles. The frontend uses JWTs to authenticate with the API. Authenticare abstracts away as much of the authentication mechanics as possible for common tasks (user registration, user sign in, reset password, etc).

Right now the easiest way to understand how to use Authenticare is to use the [authenticare tutorial](https://github.com/don-smith/authenticare-tutorial). It walks through each of the steps needed to apply it to your application on both the client and server.

However, if you'd rather jump into the deep end without as much guidance, here are the basic steps and links to the specific docs and the example app.

## Basic implementation steps

### 1. Client-side: Determine if the current user is signed in

  `isAuthenticated()`

  - [Docs](https://github.com/don-smith/authenticare/blob/master/docs/client/isAuthenticated.md)
  - [Example](https://github.com/don-smith/authenticare/blob/master/example/client/components/Authenticated.jsx)

### 2. Client-side: Allow the user to register

  `register()`

  - [Docs](https://github.com/don-smith/authenticare/blob/master/docs/client/register.md)
  - [Example](https://github.com/don-smith/authenticare/blob/master/example/client/components/Register.jsx)

### 3. Server-side: Create auth routes

  `applyAuthRoutes`

  - [Docs](https://github.com/don-smith/authenticare/blob/master/docs/server/applyAuthRoutes.md)
  - [Example](https://github.com/don-smith/authenticare/blob/master/example/server/routes/auth.js)

### 4. Server-side: Save a hash of the user's password

  `generateHash`

  - [Docs](https://github.com/don-smith/authenticare/blob/master/docs/server/generateHash.md)
  - [Example](https://github.com/don-smith/authenticare/blob/master/example/server/db/users.js)
  - [Example](https://github/com/don-smith/authenticare/blob/master/tests/server/db/seeds/users.js)

### 5. Client-side: Allow the user to sign in

  `signIn()`

  - [Docs](https://github.com/don-smith/authenticare/blob/master/docs/client/signIn.md)
  - [Example](https://github.com/don-smith/authenticare/blob/master/example/client/components/Register.jsx)

### 6. Server-side: Protect routes from unauthenticated requests

  `getTokenDecoder`

  - [Docs](https://github.com/don-smith/authenticare/blob/master/docs/server/getTokenDecoder.md)
  - [Example](https://github.com/don-smith/authenticare/blob/master/example/server/routes/fruit.js)

### 7. Client-side: Send the authorization token with each request

  `getEncodedToken()`

  - [Docs](https://github.com/don-smith/authenticare/blob/master/docs/client/getEncodedToken.md)
  - [Example](https://github.com/don-smith/authenticare/blob/master/example/client/api.js)

### 8. Client-side: Allow the user to log off

  `logOff()`

  - [Docs](https://github.com/don-smith/authenticare/blob/master/docs/client/logOff.md)
  - [Example](https://github.com/don-smith/authenticare/blob/master/example/client/components/Nav.jsx)

### 9. Client-side: Hide/show components based on auth status

  `isAuthenticated()`

  - [Docs](https://github.com/don-smith/authenticare/blob/master/docs/client/isAuthenticated.md)
  - [Example](https://github.com/don-smith/authenticare/blob/master/example/client/components/Nav.jsx)
  - [Example](https://github.com/don-smith/authenticare/blob/master/example/client/components/Authenticated.jsx)

