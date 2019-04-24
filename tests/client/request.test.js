const nock = require('nock')

const successfulTokenResponse = {
  token: 'test-token',
  message: 'Authentication successful.'
}

jest.mock('../../client/auth', () => {
  const successfulTokenResponse = {
    token: 'test-token',
    message: 'Authentication successful.'
  }
  return {
    saveAuthToken: () => successfulTokenResponse
  }
})

const request = require('../../client/request')
const { signInUrl } = require('../../endpoints')

const rootUrl = 'https://domain.example/api/v1'

describe('the request function', () => {
  it('returns the token when successful', () => {
    const user = {
      username: 'testuser',
      password: 'testpassword'
    }

    const scope = nock(rootUrl)
      .post(signInUrl)
      .reply(200, successfulTokenResponse)

    return request(rootUrl + signInUrl, user)
      .then(res => {
        expect(res.token).toBe(successfulTokenResponse.token)
        expect(res.message).toBe(successfulTokenResponse.message)
        scope.done()
      })
  })

  it('ensures the request has the right headers', () => {
    const user = {
      username: 'testuser',
      password: 'testpassword'
    }

    // This mock will only match if the request headers match
    const scope = nock(rootUrl)
      .matchHeader('Accept', 'application/json')
      .matchHeader('Content-Type', 'application/json')
      .post(signInUrl)
      .reply(200)

    return request(rootUrl + signInUrl, user)
      .then(res => {
        expect(scope.isDone()).toBeTruthy()
        scope.done()
      })
  })

  it('requires a data object', () => {
    expect.hasAssertions() // in case the catch isn't reached
    const scope = nock(rootUrl)
      .post(signInUrl)
      .reply(500)

    // Intentionally not passing the 2nd parameter to request()
    return request(rootUrl + signInUrl)
      .then(() => { /* should not get here */ })
      .catch(err => {
        expect(err.message).toMatch('data parameter is required')
        scope.done()
      })
  })

  it('requires the data parameter have a username property', () => {
    expect.hasAssertions() // in case the catch isn't reached
    const scope = nock(rootUrl)
      .post(signInUrl)
      .reply(500)

    // Intentionally passing an empty object as the 2nd parameter
    return request(rootUrl + signInUrl, {})
      .then(() => { /* should not get here */ })
      .catch(err => {
        expect(err.message).toMatch('must have a username property')
        scope.done()
      })
  })

  it('requires the data parameter have a username property', () => {
    expect.hasAssertions() // in case the catch isn't reached
    const scope = nock(rootUrl)
      .post(signInUrl)
      .reply(500)

    // Intentionally passing an empty object as the 2nd parameter
    return request(rootUrl + signInUrl, {})
      .then(() => { /* should not get here */ })
      .catch(err => {
        expect(err.message).toMatch('must have a username property')
        scope.done()
      })
  })
})
