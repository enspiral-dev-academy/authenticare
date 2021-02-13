const localStorage = global.window.localStorage

export const localStorageKeyName = 'token'

export function saveToken (token, storage = localStorage) {
  if (!token) {
    storage.removeItem(localStorageKeyName)
  } else {
    storage.setItem(localStorageKeyName, token)
  }
}

export function getToken (storage = localStorage) {
  return storage.getItem(localStorageKeyName)
}
