const bcrypt = require('bcryptjs')

class UserModel {
  constructor() {
    this.users = [
      // seed users with hashed password 'password123'
      { username: 'alice', password: bcrypt.hashSync('password123', 10), email: 'alice@example.com' },
      { username: 'bob', password: bcrypt.hashSync('password123', 10), email: 'bob@example.com' },
      { username: 'charlie', password: bcrypt.hashSync('password123', 10), email: 'charlie@example.com' },
      { username: 'diana', password: bcrypt.hashSync('password123', 10), email: 'diana@example.com' },
    ]
  }

  validateLoginData(username, password) {
    const errors = []
    if (!username || username.trim() === '') errors.push('Username is required')
    if (!password || password.trim() === '') errors.push('Password is required')
    return { isValid: errors.length === 0, errors }
  }

  validateEmail(email) {
    const errors = []
    if (!email || email.trim() === '') {
      errors.push('Email is required')
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) errors.push('Please enter a valid email address')
    }
    return { isValid: errors.length === 0, errors }
  }

  getUserByUsername(username) { return this.users.find(u => u.username === username) }
  getUserByEmail(email) { return this.users.find(u => u.email === email) }
  getAllUsers() { return this.users }

  isUsernameTaken(username) { return !!this.getUserByUsername(username) }
  isEmailTaken(email) { return !!this.getUserByEmail(email) }

  createUser({ username, email, password }) {
    const errors = []
    if (!username || username.trim() === '') errors.push('Username is required')
    if (!email || email.trim() === '') errors.push('Email is required')
    if (!password || password.trim() === '') errors.push('Password is required')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailRegex.test(email)) errors.push('Please enter a valid email address')

    if (this.isUsernameTaken(username)) errors.push('Username already taken')
    if (this.isEmailTaken(email)) errors.push('Email already in use')

    if (errors.length) return { ok: false, errors }

  const hashed = bcrypt.hashSync(password, 10)
  const user = { username, email, password: hashed }
  this.users.push(user)
  // Return without password
  const safeUser = { ...user }
  delete safeUser.password
  return { ok: true, user: safeUser }
  }

  comparePassword(plain, hashed) {
    try { return bcrypt.compareSync(plain, hashed) } catch { return false }
  }
}

module.exports = UserModel
