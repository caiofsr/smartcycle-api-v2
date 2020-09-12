import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateItems extends BaseSchema {
  protected tableName = 'items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('nome', 30).notNullable()
      table.float('peso').notNullable()
      table.boolean('doado').defaultTo(false)
      table.boolean('reservado').defaultTo(false)
      table.uuid('user_id').references('id').inTable('users').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
