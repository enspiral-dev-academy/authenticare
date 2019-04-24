const localStorage = global.window.localStorage
const localStorageKeyName = 'token'

module.exports = {
  localStorageKeyName,
  saveToken,
  getToken
}

function saveToken (token, storage = localStorage) {
  if (!token) {
    storage.removeItem(localStorageKeyName)
  } else {
    storage.setItem(localStorageKeyName, token)
  }
}

function getToken (storage = localStorage) {
  return storage.getItem(localStorageKeyName)
}
