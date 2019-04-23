const localStorage = global.window.localStorage
const TOKEN = 'token'

module.exports = {
  saveToken,
  getToken
}

function saveToken (token) {
  if (!token) {
    localStorage.removeItem(TOKEN)
  } else {
    localStorage.setItem(TOKEN, token)
  }
}

function getToken () {
  return localStorage.getItem(TOKEN)
}
