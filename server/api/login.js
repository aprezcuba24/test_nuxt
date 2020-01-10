const mongodb = require('./mongodb')
const jwtoken = require('./jwtoken')

module.exports = async (req, res) => {
  const collection = await mongodb('users')
  const user = await collection.findOne({ email: req.body.email })
  if (!user || !jwtoken.comparePassword(user, req.body.password)) {
    return res.status(403).end()
  }
  res.send(jwtoken.jwt(user))
}
