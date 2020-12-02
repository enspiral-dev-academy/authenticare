const {
  getToken,
  saveToken,
  localStorageKeyName
} = require('../../client/token-storage')

describe('saveToken', () => {
  it('saves the token to localStorage', () => {
    const token = 'test-token'
    const mockSetItem = jest.fn()
    const mockLocalStorage = {
      setItem: mockSetItem
    }

    saveToken(token, mockLocalStorage)

    expect(mockSetItem.mock.calls[0][0]).toBe('token')
    expect(mockSetItem.mock.calls[0][1]).toBe(token)
  })

  it('removes the token from localStorage when token is falsy', () => {
    const mockRemoveItem = jest.fn()
    const mockLocalStorage = {
      removeItem: mockRemoveItem
    }

    saveToken(null, mockLocalStorage)
    saveToken(undefined, mockLocalStorage)

    expect(mockRemoveItem.mock.calls[0][0]).toBe(localStorageKeyName)
    expect(mockRemoveItem.mock.calls[1][0]).toBe(localStorageKeyName)
  })
})

describe('getToken', () => {
  it('returns the token from localStorage', () => {
    const mockGetItem = jest.fn(_ => 'test-token')
    const mockLocalStorage = {
      getItem: mockGetItem
    }

    getToken(mockLocalStorage)

    expect(mockGetItem.mock.calls[0][0]).toBe(localStorageKeyName)
    expect(mockGetItem.mock.results[0].value).toBe('test-token')
  })
})
