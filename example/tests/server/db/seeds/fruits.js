exports.seed = (knex, Promise) => {
  return knex('fruits').del()
    .then(function () {
      // Inserts seed entries
      return knex('fruits').insert([
        { id: 1, name: 'Banana', calories: 105 },
        { id: 2, name: 'Apple', calories: 95 },
        { id: 3, name: 'Feijoa', calories: 26 }
      ])
    })
}
