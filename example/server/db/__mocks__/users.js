const { generateHash } = require('authenticare/server')

module.exports = {
  createUser,
  userExists,
  getUserByName
}

const users = [
  {
    id: 1,
    username: 'jess'
  }, {
    id: 2,
    username: 'jules'
  }
]

Promise.all([
  generateHash('jess'),
  generateHash('jules')
])
  .then(([jessHash, julesHash]) => {
    users[0].hash = jessHash
    users[1].hash = julesHash
    return null
  })
  .catch(() => {})

function createUser (user) {
  const newId = users.length + 1 // yea, yeah, i know
  return generateHash(user.password)
    .then(hash => {
      const newUser = {
        ...user,
        id: newId,
        hash: hash
      }
      delete newUser.password
      users.push(newUser)
      return [newId]
    })
}

function userExists (username) {
  return Promise.resolve(users.some(u => u.username === username))
}

function getUserByName (username) {
  return generateHash(username)
    .then(hash => {
      const user = users.find(u => u.username === username)
      user.hash = hash
      return user
    })
}
