import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  beforeCreate,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Item from './Item'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public estado?: string

  @column()
  public cidade?: string

  @column()
  public bairro?: string

  @column()
  public endereco?: string

  @column()
  public tipo: string

  @column()
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static createId (user: User) {
    user.id = uuidv4()
  }

  @hasMany(() => Item)
  public items: HasMany<typeof Item>
}
