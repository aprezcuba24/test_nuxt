const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = express()
const jwt = require('express-jwt')
const config = require('../nuxt.config.js')
const jwtoken = require('./api/jwtoken')
const { Resourse } = require('./api/resourse.js')

// Import and Set Nuxt.js options
config.env = process.env.NODE_ENV || 'development'

async function start() {
  app.use(bodyParser())

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  app.post('/api/login', require('./api/login'))
  app.post('/api/register', require('./api/register'))

  app.use('/api', jwt({ secret: jwtoken.SECRET_KEY }))

  Resourse.handle(app, '/api/contact', 'contacts')
  Resourse.handle(app, '/api/event', 'events')

  // Build only in dev mode
  if (config.env === 'development') {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  const server = app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
  return {
    app, server
  }
}
if (process.env.NODE_ENV !== 'test') {
  start()
}

module.exports = start
