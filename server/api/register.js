const mongodb = require('./mongodb')

module.exports = async (req, res) => {
  // TODO: It is necessary to validate the email. The e-mail cannot be repeated.
  const db = await mongodb()
  db.collection('users').insert(req.body)
  res.send(req.body)
}
