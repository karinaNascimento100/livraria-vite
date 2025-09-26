const jwt = require('jsonwebtoken')

class ApiService {
  constructor(userModel) {
    this.userModel = userModel
  }

  async login(username, password) {
    const user = this.userModel.getUserByUsername(username)
    if (user && this.userModel.comparePassword(password, user.password)) {
      const payload = { sub: user.username, email: user.email }
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'dev', { expiresIn: process.env.JWT_EXPIRES_IN || '2h' })
      return { success: true, data: { username: user.username, email: user.email, token } }
    }
    return { success: false, status: 401, error: { message: 'Invalid credentials' } }
  }

  async forgotPassword(email) {
    const user = this.userModel.getUserByEmail(email)
    if (user) {
      return { success: true, data: { sentTo: email } }
    }
    return { success: false, status: 404, error: { message: 'Email not found' } }
  }

  async checkApiHealth() {
    return { success: true }
  }

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev')
      return { ok: true, decoded }
    } catch (err) {
      return { ok: false, error: err }
    }
  }
}

module.exports = ApiService
