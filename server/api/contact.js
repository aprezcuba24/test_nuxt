const ObjectId = require('mongodb').ObjectId
const mongodb = require('./mongodb')

const list = async (req, res) => {
  const collection = await mongodb('contacts')
  res.send(await collection.find({ userId: req.user._id }).toArray())
}

const get = async (req, res) => {
  const collection = await mongodb('contacts')
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
  const collection = await mongodb('contacts')
  const { email, name } = req.body
  const { ops } = (await collection.insertOne({
    email,
    name,
    userId: req.user._id
  }))
  res.send(ops[0])
}

const update = async (req, res) => {
  const { email, name } = req.body
  const _id = ObjectId(req.params.id)
  const userId = req.user._id
  const collection = await mongodb('contacts')
  const query = {
    _id,
    userId
  }
  await collection.update(query, { name, email, userId })
  const contact = await collection.findOne(query)
  if (!contact) {
    return res.status(404).end()
  }
  res.send(contact)
}

const remove = async (req, res) => {
  const _id = ObjectId(req.params.id)
  const collection = await mongodb('contacts')
  const { result } = await collection.remove({
    _id,
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
