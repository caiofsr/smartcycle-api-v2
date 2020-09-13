import test from 'japa'
import supertest from 'supertest'
import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('User', () => {
  test('it should update user profile', async assert => {
    const user = {
      nome: 'Luiza Isis Duarte',
      email: 'luizaisisduarte_@acaoi.com.br',
      password: 'GrMiQBxDqQ',
      tipo: 'doador',
    }

    await User.create(user)

    const response = await supertest(BASE_URL)
      .post('/v1/client/auth/signin')
      .send({ email: user.email, password: user.password })
      .expect(201)

    const newUser = {
      nome: user.nome,
      estado: 'Pernambuco',
      cidade: 'Paulista',
      bairro: 'Jardim Paulista',
      endereco: 'Rua 68, 90',
      tipo: 'coletor',
    }

    const { body } = await supertest(BASE_URL)
      .put('/v1/client/profile/edit')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(newUser)
      .expect(200)

    assert.include(body, newUser)
  })
})
