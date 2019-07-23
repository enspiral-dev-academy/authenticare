# Authenticare

> A JWT helper library for full-stack Node apps

You can find an example fullstack application in the `example` folder.

You can find the docs for the most important functions exported for both client-side and server-side use in the `docs` folder.

## Version `0.4.3`

### Non-breaking changes

* Updated dependencies to fix known security vulnerabilities


## Version `0.4.2`

### Non-breaking changes

* Updated dependencies to fix known security vulnerabilities


## Version `0.4.0`

### Non-breaking changes

* `client/getDecodedToken` was added
* `client/getAuthorizationHeader` was added (`getEncodedToken` is still available, but less relevant now)
* A tutorial was added (but it still needs more work)

### Breaking changes

* `client/getAuthToken` was function renamed to `getDecodedToken` to match `getEncodedToken`
* The `createUser` function passed to `server/applyAuthRoutes` now takes a single `user` object parameter instead of `username` and `password` parameters
