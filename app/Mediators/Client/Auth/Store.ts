
import User from 'App/Models/User'

const Store = async ({ nome, email, password, tipo }: User) => {
  const userExists = await User.findBy('email', email)

  if (!userExists) {
    const user = await User.create({ nome, email, password, tipo })

    return { status: 201, data: user }
  } else {
    return { status: 400, data: { error: 'Email já em uso' } }
  }
}

export default Store
