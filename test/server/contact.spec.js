const { start, auth } = require('./base')

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
    let data
    // Register other contact with other user. The "token" can't access to this contact.
    const token2 = await auth(client, {
      email: 'admin2@gmail.com',
      password: 'aaa'
    })
    data = await client.post('/api/contact')
      .set('Authorization', token2)
      .send({ email: 'contact_admin2@gmail.com', name: 'contact_admin2' })
      .expect(200)
    const contact2 = data.body

    // Get list of contacts
    data = await client.get('/api/contact')
      .set('Authorization', token)
      .expect(200)
    expect(data.body.length).toBe(0)

    // Create a contact
    data = await client.post('/api/contact')
      .set('Authorization', token)
      .send({ email: 'contact_1@gmail.com', name: 'contact_1' })
      .expect(200)
    expect(data.body).toHaveProperty('_id')
    expect(data.body.name).toBe('contact_1')
    const contact = data.body

    // Get a contact by id
    data = await client.get(`/api/contact/${contact._id}`)
      .set('Authorization', token)
      .expect(200)
    expect(data.body).toHaveProperty('_id')
    expect(data.body.name).toBe('contact_1')

    // Try to access to the other contact
    data = await client.get(`/api/contact/${contact2._id}`)
      .set('Authorization', token)
      .expect(404)

    data = await client.put(`/api/contact/${contact._id}`)
      .set('Authorization', token)
      .send({ email: 'contact_2@gmail.com', name: 'contact_2' })
      .expect(200)
    expect(data.body).toHaveProperty('_id')
    expect(data.body.name).not.toBe('contact_1')
    expect(data.body.name).toBe('contact_2')

    // Try to update the other contact
    data = await client.put(`/api/contact/${contact2._id}`)
      .set('Authorization', token)
      .expect(404)

    // Remove the contact
    data = await client.delete(`/api/contact/${contact._id}`)
      .set('Authorization', token)
      .expect(200)
    await client.get(`/api/contact/${contact._id}`)
      .set('Authorization', token)
      .expect(404)

    // Try to remove the other contact
    await client.delete(`/api/contact/${contact2._id}`)
      .set('Authorization', token)
      .expect(404)
  })
})
