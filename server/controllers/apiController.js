const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const ApiService = require('../services/apiService');

const userModel = new UserModel();
const apiService = new ApiService(userModel);

// Simple auth middleware for Bearer token
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ success: false, message: 'Missing token' })
  const result = apiService.verifyToken(token)
  if (!result.ok) return res.status(401).json({ success: false, message: 'Invalid token' })
  req.user = result.decoded
  next()
}

// Register endpoint
router.post('/register', (req, res) => {
  try {
    const { username, email, password } = req.body
    const created = userModel.createUser({ username, email, password })
    if (!created.ok) return res.status(400).json({ success: false, errors: created.errors })
    return res.status(201).json({ success: true, message: 'User registered', data: created.user })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message })
  }
})

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input data
    const validation = userModel.validateLoginData(username, password);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    // Call service (could be external API)
    const result = await apiService.login(username, password);

    if (result.success) {
      res.json({
        success: true,
        message: 'Login successful',
        data: result.data,
      });
    } else {
      res.status(result.status || 401).json({
        success: false,
        message: result.error?.message || 'Login failed',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// Example protected route to get current user info
router.get('/me', authMiddleware, (req, res) => {
  const user = userModel.getUserByUsername(req.user?.sub)
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  const safe = { username: user.username, email: user.email }
  res.json({ success: true, data: safe })
})

// Forgot password endpoint
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    const validation = userModel.validateEmail(email);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    // Call service (could be external API)
    const result = await apiService.forgotPassword(email);

    if (result.success) {
      res.json({
        success: true,
        message: 'Password reset email sent',
        data: result.data,
      });
    } else {
      res.status(result.status || 400).json({
        success: false,
        message: result.error?.message || 'Password reset failed',
        error: result.error,
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

// API health check endpoint
router.get('/health', async (req, res) => {
  try {
    const result = await apiService.checkApiHealth();
    res.json({
      success: result.success,
      message: result.success ? 'API is healthy' : 'API is not responding',
      error: result.error,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Health check failed',
      error: error.message,
    });
  }
});

// Get available users (for demo purposes)
router.get('/users', (req, res) => {
  try {
    const users = userModel.getAllUsers();
    res.json({
      success: true,
      data: users.map((user) => ({ username: user.username, email: user.email })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get users',
      error: error.message,
    });
  }
});

module.exports = router;
