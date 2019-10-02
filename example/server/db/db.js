const connection = require('./connection')

module.exports = {
  getFruits,
  addFruit,
  updateFruit,
  deleteFruit
}

function sort (fruitArray) {
  const allFruits = [...fruitArray]
  allFruits.sort((a, b) => a.id - b.id)
  return allFruits
}

async function getFruits (db = connection) {
  return db('fruits').select().then(sort)
}

async function addFruit (fruit, user, db = connection) {
  fruit.added_by_user = user.id
  return db('fruits')
    .insert(fruit)
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

async function updateFruit (newFruit, user, db = connection) {
  return db('fruits')
    .where('id', newFruit.id)
    .first()
    .then(fruit => authorizeUpdate(fruit, user))
    .then(() => {
      return db('fruits')
        .where('id', newFruit.id)
        .update(newFruit)
    })
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

async function deleteFruit (id, user, db = connection) {
  return db('fruits')
    .where('id', id)
    .first()
    .then(fruit => authorizeUpdate(fruit, user))
    .then(() => {
      return db('fruits')
        .where('id', id)
        .delete()
    })
    .then(() => db)
    .then(getFruits)
    .then(sort)
}

function authorizeUpdate (fruit, user) {
  console.log('fruit and user', fruit, user)
  if (fruit.added_by_user !== user.id) {
    throw new Error('Unauthorized')
  }
}
