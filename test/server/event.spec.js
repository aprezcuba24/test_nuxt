const { start, auth } = require('./base')

describe('Event', () => {
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
  test('All', async () => {
    let data
    // Register other event with other user. The "token" can't access to this event.
    const token2 = await auth(client, {
      email: 'admin2@gmail.com',
      password: 'aaa'
    })
    data = await client.post('/api/event')
      .set('Authorization', token2)
      .send({ title: 'event2' })
      .expect(200)
    const event2 = data.body

    // Get list of events
    data = await client.get('/api/event')
      .set('Authorization', token)
      .expect(200)
    expect(data.body.length).toBe(0)

    // Create a event
    data = await client.post('/api/event')
      .set('Authorization', token)
      .send({ title: 'event_1' })
      .expect(200)
    expect(data.body).toHaveProperty('_id')
    expect(data.body.title).toBe('event_1')
    const event = data.body

    // Get a event by id
    data = await client.get(`/api/event/${event._id}`)
      .set('Authorization', token)
      .expect(200)
    expect(data.body).toHaveProperty('_id')
    expect(data.body.title).toBe('event_1')

    // Try to access to the other event
    data = await client.get(`/api/event/${event2._id}`)
      .set('Authorization', token)
      .expect(404)

    // Update the event
    data = await client.put(`/api/event/${event._id}`)
      .set('Authorization', token)
      .send({ title: 'event_2' })
      .expect(200)
    expect(data.body).toHaveProperty('_id')
    expect(data.body.title).not.toBe('event_1')
    expect(data.body.title).toBe('event_2')

    // Try to update the other event
    data = await client.put(`/api/event/${event2._id}`)
      .set('Authorization', token)
      .expect(404)

    // Remove the event
    data = await client.delete(`/api/event/${event._id}`)
      .set('Authorization', token)
      .expect(200)
    await client.get(`/api/event/${event._id}`)
      .set('Authorization', token)
      .expect(404)

    // Try to remove the other event
    await client.delete(`/api/event/${event2._id}`)
      .set('Authorization', token)
      .expect(404)
  })
})
