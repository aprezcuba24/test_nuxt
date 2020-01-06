const mongodb = require('./mongodb')
const jwtoken = require('./jwtoken')

module.exports = async (req, res) => {
  // TODO: It is necessary to validate the email. The e-mail cannot be repeated.
  const db = await mongodb()
  const collection = db.collection('users')
  const { email, password } = req.body
  await collection.insertOne({
    email,
    password: jwtoken.encryptPassword(password),
  })
  const user = await collection.findOne({ email: req.body.email })
  res.send(res.send(jwtoken.jwt(user)))
}
