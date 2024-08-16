import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'local_atendimentos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('nome').notNullable()
      table.string('rua').notNullable()
      table.string('bairro').notNullable()
      table.integer('numero').notNullable()
      table.string('cidade').notNullable()
      table.string('estado').notNullable()

      table
      .integer('compania_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('companias')
      .onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
