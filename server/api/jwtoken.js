const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const SECRET_KEY = "secretkey23456"

const jwt = user => {
  const expiresIn = 24 * 60 * 60
  const accessToken = jsonwebtoken.sign({ user }, SECRET_KEY, {
    expiresIn: expiresIn
  })
  return {
    user,
    accessToken,
  }
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
  SECRET_KEY
}
