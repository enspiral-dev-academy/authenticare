exports.seed = (knex) => {
  return knex('fruits').del()
    .then(() => {
      return knex('fruits').insert([
        { id: 1, name: 'Banana', calories: 105, added_by_user: 1 },
        { id: 2, name: 'Apple', calories: 95, added_by_user: 2 },
        { id: 3, name: 'Feijoa', calories: 26, added_by_user: 1 }
      ])
    })
}
