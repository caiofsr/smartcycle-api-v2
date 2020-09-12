
import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Item', () => {
  test('it should insert a new item', async assert => {
    const authentication = {
      email: 'test@example.com',
      password: 'testpassword',
    }

    const payload = {
      nome: 'Latinhas de alumínio',
      peso: 2,
    }

    const response = await supertest(BASE_URL)
      .post('/v1/client/auth/signin')
      .send(authentication)
      .expect(201)

    const { body } = await supertest(BASE_URL)
      .post('/v1/client/item/store')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send(payload)
      .expect(201)

    assert.include(body, payload)
  })
})
