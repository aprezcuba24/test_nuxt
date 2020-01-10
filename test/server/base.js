const request = require('supertest')
const startApp = require('../../server')
const mongodb = require('../../server/api/mongodb')

const runClearDb = async () => {
  const db = await mongodb()
  db.dropDatabase()
}

const start = async (secure = true, clearDb = true, user = {}) => {
  if (clearDb) {
    await runClearDb()
  }
  const { app, server } = await startApp()
  const client = request(app)
  let token
  if (secure) {
    const password = user.password || 'aaa'
    const email = user.email || 'admin@gmail.com'

    const { body } = await client
      .post('/api/register')
      .send({ email, password })
      .expect(200)
    token = `Bearer ${body.accessToken}`
  }
  client.close = () => server.close()
  return { client, token }
}

module.exports = {
  start
}
