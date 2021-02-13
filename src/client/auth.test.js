import * as auth from './auth'

import decode from './jwtDecode'
import { saveToken, getToken } from './tokenStorage'

jest.mock('./jwtDecode')
jest.mock('./tokenStorage')

beforeEach(() => jest.resetModules())

describe('isAuthenticated', () => {
  it('returns true if token has not expired', () => {
    getToken.mockImplementation(() => 'test-token')

    decode.mockImplementation(token => {
      const today = new Date()
      const tomorrow = today.setDate(today.getDate() + 1)
      return {
        exp: tomorrow / 1000 // milliseconds -> seconds
      }
    })

    const result = auth.isAuthenticated()
    expect(result).toBeTruthy()
  })

  it('returns false if token has expired', () => {
    expect.assertions(2) // in case decode is never called

    getToken.mockImplementation(() => 'test-token')
    saveToken.mockImplementation(() => {})

    decode.mockImplementation(token => {
      expect(token).toBe('test-token')
      const today = new Date()
      const yesterday = today.setDate(today.getDate() - 1)
      return {
        exp: yesterday / 1000 // milliseconds -> seconds
      }
    })

    const result = auth.isAuthenticated()
    expect(result).toBeFalsy()
  })

  it('logs off the user if token has expired', () => {
    expect.assertions(2) // in case decode and saveToken are never called

    getToken.mockImplementation(() => 'test-token')
    saveToken.mockImplementation(token => {
      expect(token).toBeNull()
    })

    decode.mockImplementation(token => {
      expect(token).toBe('test-token')
      const today = new Date()
      const yesterday = today.setDate(today.getDate() - 1)
      return {
        exp: yesterday / 1000 // milliseconds -> seconds
      }
    })

    auth.isAuthenticated()
  })

  it('returns false if no token is present', () => {
    getToken.mockImplementation(() => {}) // no token returned
    const result = auth.isAuthenticated()
    expect(result).toBeFalsy()
  })
})

describe('saveAuthToken', () => {
  it('saves the token and returns a decoded token', () => {
    expect.assertions(3)
    const testToken = 'test-token'

    saveToken.mockImplementation(token => {
      expect(token).toBe('test-token')
    })

    decode.mockImplementation(token => {
      expect(token).toBe('test-token')
      return {
        sub: 'token-test'
      }
    })

    expect(auth.saveAuthToken(testToken).sub).toBe('token-test')
  })
})

describe('getDecodedToken', () => {
  it('returns a decoded token when token is present', () => {
    expect.assertions(2)

    getToken.mockImplementation(() => 'test-token')

    decode.mockImplementation(token => {
      expect(token).toBe('test-token')
      return {
        sub: 'token-test'
      }
    })

    expect(auth.getDecodedToken().sub).toBe('token-test')
  })

  it('returns null if no token is present', () => {
    getToken.mockImplementation(() => {})
    expect(auth.getDecodedToken()).toBeNull()
  })
})

describe('getEncodedToken', () => {
  it('returns the encoded token', () => {
    getToken.mockImplementation(() => 'test-token')
    expect(auth.getEncodedToken()).toBe('test-token')
  })
})

describe('logOff', () => {
  it('attempts to save a null token', () => {
    expect.assertions(1)

    saveToken.mockImplementation(token => {
      expect(token).toBeNull()
    })

    auth.logOff()
  })
})
