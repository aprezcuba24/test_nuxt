const { jwt, encryptPassword, comparePassword } = require('../../server/api/jwtoken')

describe('JWT', () => {
  test('create token', () => {
    const result = jwt({ email: 'admin@gmail.com' })
    expect(result).toHaveProperty('user')
    expect(result).toHaveProperty('accessToken')
  })
  test('encript password', () => {
    const user = {
      password: encryptPassword('aaa')
    }
    expect(comparePassword(user, 'aaa')).toBe(true)
    expect(comparePassword(user, 'bbb')).toBe(false)
  })
})
