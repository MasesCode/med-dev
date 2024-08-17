import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Compania from './compania.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ConsultaTipo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tipo: string

  @column()
  declare companiaId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Compania)
  declare compania: BelongsTo<typeof Compania>
}