const { start } = require('./base')

describe('Contact', () => {
  let client
  let token
  beforeEach(async () => {
    const data = await start()
    client = data.client
    token = data.token
  })
  afterEach(async () => {
    await client.close()
  })
  test('all', async () => {
    let data = await client.get('/api/contact')
      .set('Authorization', token)
      .expect(200)
    expect(data.body.length).toBe(0)

    data = await client.post('/api/contact')
      .set('Authorization', token)
      .send({ email: 'contact_1@gmail.com', name: 'contact_1' })
      .expect(200)
    expect(data.body).toHaveProperty('_id')
    expect(data.body.name).toBe('contact_1')

    data = await client.get(`/api/contact/${data.body._id}`)
      .set('Authorization', token)
      .expect(200)
    expect(data.body).toHaveProperty('_id')
    expect(data.body.name).toBe('contact_1')

    data = await client.put(`/api/contact/${data.body._id}`)
      .set('Authorization', token)
      .send({ email: 'contact_2@gmail.com', name: 'contact_2' })
      .expect(200)
    expect(data.body).toHaveProperty('_id')
    expect(data.body.name).not.toBe('contact_1')
    expect(data.body.name).toBe('contact_2')

    data = await client.get('/api/contact')
      .set('Authorization', token)
      .expect(200)
    expect(data.body.length).toBe(1)
  })
})
