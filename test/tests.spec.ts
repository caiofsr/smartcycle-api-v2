import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Session', () => {
  test('it should create a new user', async assert => {
    const payload = {
      nome: 'John',
      email: 'test@example.com',
      password: 'testpassword',
      tipo: 'doador',
    }

    const { body } = await supertest(BASE_URL)
      .post('/v1/client/auth/signup')
      .send(payload)
      .expect(201)

    assert.exists(body)
  })

  test('it should create a new token', async assert => {
    const payload = {
      email: 'test@example.com',
      password: 'testpassword',
    }

    const { body } = await supertest(BASE_URL)
      .post('/v1/client/auth/signin')
      .send(payload)
      .expect(201)

    assert.exists(body.token)
  })
})
