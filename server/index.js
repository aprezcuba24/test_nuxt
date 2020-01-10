const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = express()
const jwt = require('express-jwt')
const jwtoken = require('./api/jwtoken')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.env = process.env.NODE_ENV || 'development'

async function start() {
  app.use(bodyParser())

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  app.post('/api/login', require('./api/login'))
  app.post('/api/register', require('./api/register'))

  // app.use(jwt({ secret: jwtoken.SECRET_KEY }).unless({
  //   path: ['/', '/api/login', '/api/register']
  // }))

  app.use('/api', jwt({ secret: jwtoken.SECRET_KEY }))

  const contact = require('./api/contact')
  app.post('/api/contact', jwt({ secret: jwtoken.SECRET_KEY }), contact.create)
  app.get('/api/contact', contact.list)
  app.get('/api/contact/:id', contact.get)
  app.put('/api/contact/:id', contact.update)
  app.delete('/api/contact/:id', contact.remove)

  const evnets = require('./api/events')
  app.post('/api/event', evnets.create)
  app.get('/api/event', evnets.list)
  app.get('/api/event/:id', evnets.get)
  app.put('/api/event/:id', evnets.update)
  app.delete('/api/event/:id', evnets.remove)

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
