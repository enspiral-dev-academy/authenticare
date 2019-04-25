const hash = require('../../server/hash')

beforeEach(() => jest.resetModules())

describe('hash.generate', () => {
  it('returns an argon v2 hash from the clear text password', () => {
    // just the beginning of the expected resulting hash
    const expected = '$argon2id$v=19$m=65536,t=2,p=1'
    return hash.generate('test-password')
      .then(actual => {
        expect(actual).toMatch(expected)
      })
  })
})

describe('hash.verify', () => {
  it('returns true when given a valid hash and correct password', () => {
    const password = 'test-password'
    const passwordHash = '$argon2id$v=19$m=65536,t=2,p=1$vyDA85ZGWn7Vk1fC/hejHg$2YGy8S5RFq0FsQbNMp+kizzh0I4blb9ywW+AoJ3SbKQ'
    return hash.verify(passwordHash, password)
      .then(result => {
        expect(result).toBeTruthy()
      })
  })

  it('returns false when given an invalid hash', () => {
    const password = 'test-password'
    const passwordHash = '$argon2id$v=19$m=65536,t=2,p=1$vyDA85zGWn7Vk1FC/hejHG$2YGy8s5RFq0FsQbNMp+kizzh0I4blb9ywW+AoJ3SbKQ' // the case of some characters have been changed
    return hash.verify(passwordHash, password)
      .then(result => {
        expect(result).toBeFalsy()
      })
  })

  it('returns false when given an incorrect password', () => {
    const password = 'bad-password'
    const passwordHash = '$argon2id$v=19$m=65536,t=2,p=1$vyDA85ZGWn7Vk1fC/hejHg$2YGy8S5RFq0FsQbNMp+kizzh0I4blb9ywW+AoJ3SbKQ'
    return hash.verify(passwordHash, password)
      .then(result => {
        expect(result).toBeFalsy()
      })
  })
})
