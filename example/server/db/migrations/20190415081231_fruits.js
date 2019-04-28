exports.up = (knex, Promise) => {
  return knex.schema.createTable('fruits', table => {
    table.increments('id').primary()
    table.string('name')
    table.integer('calories')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('fruits')
}
