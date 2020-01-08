const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  app.use(bodyParser())

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.post('/api/login', require('./api/login'))
  app.post('/api/register', require('./api/register'))

  const contact = require('./api/contact')
  app.post('/api/contact', contact.create)
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

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
