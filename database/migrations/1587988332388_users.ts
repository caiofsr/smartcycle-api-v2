import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('nome').notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('estado').nullable()
      table.string('cidade').nullable()
      table.string('bairro').nullable()
      table.string('endereco').nullable()
      table.enu('tipo', ['doador', 'coletor']).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
