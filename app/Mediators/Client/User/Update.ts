import User from 'App/Models/User'

const Update = async ({ nome, estado, cidade, bairro, endereco, tipo }: User, userId) => {
  const user = await User.findBy('id', userId)

  if (user) {
    user.nome = nome
    user.estado = estado
    user.cidade = cidade
    user.bairro = bairro
    user.endereco = endereco
    user.tipo = tipo

    await user.save()

    return { status: 200, data: user }
  } else {
    return { status: 400, data: { error: 'Existe algum problema com sua requisição' } }
  }
}

export default Update
