const { start } = require('./base')

describe('Login and Register', () => {
  let client
  beforeEach(async () => {
    const data = await start(false)
    client = data.client
  })
  afterEach(async () => {
    await client.close()
  })
  test('All', async () => {
    const email = 'test_login@gmail.com'
    const password = 'aaaa'

    await client
      .post('/api/register')
      .send({ email, password })
      .expect(200)

    await client
      .post('/api/login')
      .send({ email, password })
      .expect(200)

    await client
      .post('/api/login')
      .send({ email, password: 'fff' })
      .expect(403)

    await client.close()
  })
})
