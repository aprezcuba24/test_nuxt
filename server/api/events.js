const mongodb = require('./mongodb')
const ObjectId = require('mongodb').ObjectId

const tableName = 'events'

const list = async (req, res) => {
  const collection = await mongodb(tableName)
  res.send(await collection.find({
    userId: req.user._id
  }).toArray())
}

const get = async (req, res) => {
  const collection = await mongodb(tableName)
  const contact = await collection.findOne({
    _id: ObjectId(req.params.id),
    userId: req.user._id
  })
  if (!contact) {
    return res.status(404).end()
  }
  res.send(contact)
}

const create = async (req, res) => {
  const collection = await mongodb(tableName)
  const { title, start, end, allDay, contactId } = req.body
  const userId = req.user._id
  const { ops } = (await collection.insertOne({
    title, start, end, allDay, contactId, userId
  }))
  res.send(ops[0])
}

const update = async (req, res) => {
  const { title, start, end, allDay, contactId } = req.body
  const userId = req.user._id
  const query = {
    userId,
    _id: ObjectId(req.params.id)
  }
  const collection = await mongodb(tableName)
  await collection.update(query,
    { title, start, end, allDay, contactId, userId }
  )
  const contact = await collection.findOne(query)
  if (!contact) {
    return res.status(404).end()
  }
  res.send(contact)
}

const remove = async (req, res) => {
  const collection = await mongodb(tableName)
  const { result } = await collection.remove({
    _id: ObjectId(req.params.id),
    userId: req.user._id
  })
  if (result.n === 0) {
    return res.status(404).end()
  }
  res.send()
}

module.exports = {
  create,
  list,
  get,
  update,
  remove
}
