const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const SECRET_KEY = "secretkey23456"

const jwt = user => {
  const expiresIn = 24 * 60 * 60
  return jsonwebtoken.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: expiresIn
  })
}

const encryptPassword = password => {
  var salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

const comparePassword = (user, password) => {
  return bcrypt.compareSync(password, user.password)
}

module.exports = {
  jwt,
  encryptPassword,
  comparePassword,
}