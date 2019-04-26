const { generateHash } = require('authenticare/server')

exports.seed = (knex, Promise) => {
  return Promise.all([
    generateHash('jess'),
    generateHash('jules')
  ]).then(([jessHash, julesHash]) => {
    return knex('users').insert([
      { id: 1, username: 'jess', hash: jessHash },
      { id: 2, username: 'jules', hash: julesHash }
    ])
  })
}
