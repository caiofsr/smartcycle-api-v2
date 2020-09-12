
import Item from 'App/Models/Item'
import User from 'App/Models/User'

const Store = async ({ nome, peso }: Item, userId) => {
  const user = await User.findBy('id', userId)

  if(user?.tipo === 'coletor') {
    return { status: 400, data: { error: 'Você não pode registrar novos itens'}}
  }

  const item = await Item.create({ nome, peso, userId })

  return { status: 201, data: item }
}

export default Store
