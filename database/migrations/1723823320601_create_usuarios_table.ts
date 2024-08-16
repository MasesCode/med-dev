import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('nome_completo').notNullable()

      table
      .integer('usuario_tipo_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('usuario_tipos')
      .onDelete('CASCADE')

      table
      .integer('compania_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('companias')
      .onDelete('CASCADE')

      table.string('email', 254).nullable().unique()
      table.string('password').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}