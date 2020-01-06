const mongodb = require('./mongodb')
const jwtoken = require('./jwtoken')

module.exports = async (req, res) => {
  const db = await mongodb()
  const user = await db.collection('users').findOne({ email: req.body.email })
  if (!user || !jwtoken.comparePassword(user, req.body.password)) {
    return res.status(403).end()
  }
  res.send(jwtoken.jwt(user))
}
