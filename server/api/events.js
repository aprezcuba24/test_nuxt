const mongodb = require('./mongodb')
const ObjectId = require('mongodb').ObjectId

const tableName = 'events'

const list = async (req, res) => {
  console.log('events...')
  console.log(req.user)
  const collection = await mongodb(tableName)
  res.send(await collection.find().toArray())
}

const get = async (req, res) => {
  const collection = await mongodb(tableName)
  const contact = await collection.findOne({ _id: ObjectId(req.params.id) })
  res.send(contact)
}

const create = async (req, res) => {
  const collection = await mongodb(tableName)
  const { title, start, end, allDay, contactId } = req.body
  const { ops } = (await collection.insertOne({
    title, start, end, allDay, contactId
  }))
  res.send(ops[0])
}

const update = async (req, res) => {
  const { title, start, end, allDay, contactId } = req.body
  const _id = ObjectId(req.params.id)
  const collection = await mongodb(tableName)
  await collection.update(
    { _id },
    { title, start, end, allDay, contactId }
  )
  const contact = await collection.findOne({ _id })
  res.send(contact)
}

const remove = async (req, res) => {
  const _id = ObjectId(req.params.id)
  const collection = await mongodb(tableName)
  await collection.remove({ _id })
  res.send()
}

module.exports = {
  create,
  list,
  get,
  update,
  remove
}
