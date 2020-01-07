const mongodb = require('./mongodb')
const ObjectId = require('mongodb').ObjectId

const list = async (req, res) => {
  const collection = await mongodb('contacts')
  res.send(await collection.find().toArray())
}

const get = async (req, res) => {
  const collection = await mongodb('contacts')
  const contact = await collection.findOne({ _id: ObjectId(req.params.id) })
  res.send(contact)
}

const create = async (req, res) => {
  const collection = await mongodb('contacts')
  const { email, name } = req.body
  const { ops } = (await collection.insertOne({
    email,
    name,
  }))
  res.send(ops[0])
}

const update = async (req, res) => {
  const { email, name } = req.body
  const _id = ObjectId(req.params.id)
  const collection = await mongodb('contacts')
  await collection.update(
    { _id },
    { name, email }
  )
  const contact = await collection.findOne({ _id })
  res.send(contact)
}

const remove = async (req, res) => {
  const _id = ObjectId(req.params.id)
  const collection = await mongodb('contacts')
  await collection.remove({ _id })
  res.send()
}

module.exports = {
  create,
  list,
  get,
  update,
  remove,
}