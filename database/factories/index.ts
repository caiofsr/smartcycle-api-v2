import Factory from '@ioc:Adonis/Lucid/Factory'
import Item from 'App/Models/Item'
import User from 'App/Models/User'

export const ItemFactory = Factory
  .define(Item, ({ faker }) => {
    faker.locale = 'pt-BR'
    return {
      nome: faker.commerce.productName(),
      peso: faker.random.number({min: 0, max: 30}),
      doado: faker.random.boolean(),
      reservado: faker.random.boolean(),
    }
  })
  .build()

export const UserFactory = Factory
  .define(User, ({ faker }) => {
    faker.setLocale('pt-BR')
    const tipo = ['doador', 'coletor']
    return {
      nome: faker.name.findName(),
      email: faker.internet.email(),
      estado: faker.address.state(),
      cidade: faker.address.city(),
      bairro: faker.address.streetName(),
      endereco: faker.address.streetAddress(),
      tipo: faker.random.arrayElement(tipo),
    }
  })
  .relation('items', () => ItemFactory)
  .build()
