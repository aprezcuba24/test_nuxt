const ObjectId = require('mongodb').ObjectId
const mongodb = require('./mongodb')

class Resourse {
  constructor(collectionName) {
    this.collectionName = collectionName
    mongodb(collectionName).then(collection => {
      this.collection = collection
    })
  }
  static handle(app, route, collectionName) {
    const obj = new Resourse(collectionName)

    app.get(route, obj.list.bind(obj))
    app.post(route, obj.create.bind(obj))
    app.get(`${route}/:id`, obj.get.bind(obj))
    app.put(`${route}/:id`, obj.update.bind(obj))
    app.delete(`${route}/:id`, obj.remove.bind(obj))

    return obj
  }

  sendOr404(res, data) {
    if (!data) {
      return res.status(404).end()
    }
    res.send(data)
  }

  async list(req, res) {
    res.send(await this.collection.find({ userId: req.user._id }).toArray())
  }
  async get(req, res) {
    const obj = await this.collection.findOne({
      _id: ObjectId(req.params.id),
      userId: req.user._id,
    })
    this.sendOr404(res, obj)
  }
  async create(req, res) {
    const { ops } = (await this.collection.insertOne({
      ...req.body,
      userId: req.user._id
    }))
    res.send(ops[0])
  }
  async update(req, res) {
    const _id = ObjectId(req.params.id)
    const userId = req.user._id
    const query = {
      _id,
      userId
    }
    const { body } = req
    delete body._id
    await this.collection.update(query, { ...body, userId })
    const obj = await this.collection.findOne(query)
    this.sendOr404(res, obj)
  }
  async remove(req, res) {
    const _id = ObjectId(req.params.id)
    const { result } = await this.collection.remove({
      _id,
      userId: req.user._id
    })
    if (!result.n) {
      return res.status(404).end()
    }
    res.send()
  }
}

module.exports = {
  Resourse
}
