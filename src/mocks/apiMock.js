// Lightweight browser-side API mock to make the app self-contained (runs on port 5174 only)
// Contract: Intercepts window.fetch for URLs that start with '/api'.
// Features:
// - Endpoints: POST /api/login, POST /api/register, POST /api/forgot-password,
//              GET /api/users, GET /api/me, GET /api/health
// - Simulated users in-memory, token issuance/verification, attempt-based blocking (optional)
// - Responses aligned with current backend and the team "artifício":
//   * login: success message "Login successful! Welcome back." or "Invalid username or password"
//   * forgot-password: returns { success: true, newPassword: 'newpassword' }
//   * register: validates basic fields and unique username/email
//   * health: { ok: true, name: 'Livraria API (mock)', version: '1.0.0', docs: '/api/health' }


const MOCK_LATENCY_MS = 500
const ENABLE_ATTEMPT_BLOCK = true // optional: set false to disable blocking logic
const MAX_ATTEMPTS = 3

const users = [
  { id: 1, username: 'alice', email: 'alice@example.com', password: 'alice123' },
  { id: 2, username: 'bob', email: 'bob@example.com', password: 'bob123' },
]

const attempts = new Map() // key: username, value: count

function wait(ms) { return new Promise(r => setTimeout(r, ms)) }

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  })
}

function errorResponse(message, status = 400) {
  return jsonResponse({ success: false, message }, { status })
}

function makeToken(payload) {
  // Simple base64 token (NOT secure; just a mock)
  return btoa(JSON.stringify({ ...payload, iat: Date.now() }))
}

function parseAuthHeader(headers) {
  const auth = headers.get('Authorization') || headers.get('authorization')
  if (!auth) return null
  const [scheme, token] = auth.split(' ')
  if (scheme !== 'Bearer' || !token) return null
  try {
    const decoded = JSON.parse(atob(token))
    return decoded
  } catch {
    return null
  }
}

function findUserByUsernameOrEmail(identifier) {
  return users.find(u => u.username === identifier || u.email === identifier)
}

function usernameTaken(username) { return users.some(u => u.username === username) }
function emailTaken(email) { return users.some(u => u.email === email) }

async function handleLogin(body) {
  const { username, password } = body || {}
  if (!username || !password) return errorResponse('Username and password are required', 400)

  if (ENABLE_ATTEMPT_BLOCK) {
    const count = attempts.get(username) || 0
    if (count >= MAX_ATTEMPTS) {
      return errorResponse('Conta bloqueada por tentativas inválidas', 403)
    }
  }

  const user = findUserByUsernameOrEmail(username)
  if (!user || user.password !== password) {
    if (ENABLE_ATTEMPT_BLOCK) attempts.set(username, (attempts.get(username) || 0) + 1)
    return errorResponse('Invalid username or password', 401)
  }

  attempts.delete(username)

  const token = makeToken({ sub: user.id, username: user.username })
  return jsonResponse({ success: true, message: 'Login successful! Welcome back.', token, user: { username: user.username, email: user.email } })
}

async function handleRegister(body) {
  const { username, email, password } = body || {}
  const errors = {}
  if (!username || username.length < 3) errors.username = 'username must be at least 3 characters'
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'email must be a valid email'
  if (!password || password.length < 6) errors.password = 'password must be at least 6 characters'
  if (username && usernameTaken(username)) errors.username = 'username already taken'
  if (email && emailTaken(email)) errors.email = 'email already taken'

  if (Object.keys(errors).length) {
    return jsonResponse({ success: false, errors, message: 'Validation error' }, { status: 400 })
  }

  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1
  users.push({ id, username, email, password })
  return jsonResponse({ success: true, user: { username, email } }, { status: 201 })
}

async function handleForgot(body) {
  const { email } = body || {}
  if (!email) return errorResponse('email is required', 400)
  const user = users.find(u => u.email === email)
  if (!user) return errorResponse('User not found', 404)
  // team artificio: always returns newpassword
  return jsonResponse({ success: true, newPassword: 'newpassword' })
}

async function handleMe(headers) {
  const payload = parseAuthHeader(headers)
  if (!payload) return errorResponse('Unauthorized', 401)
  const user = users.find(u => u.id === payload.sub)
  if (!user) return errorResponse('Unauthorized', 401)
  return jsonResponse({ success: true, user: { username: user.username, email: user.email } })
}

async function handleUsers() {
  // demo list of users
  return jsonResponse({ success: true, users: users.map(({ username, email }) => ({ username, email })) })
}

async function handleHealth() {
  return jsonResponse({ ok: true, name: 'Livraria API (mock)', version: '1.0.0', docs: '/api/health' })
}

function isApiUrl(url) {
  try {
    // Accept absolute or relative URLs
    const u = new URL(url, window.location.origin)
    return u.pathname.startsWith('/api')
  } catch {
    return false
  }
}

export function enableApiMock() {
  if (window.__apiMockPatched) return
  const origFetch = window.fetch
  window.fetch = async (input, init = {}) => {
    try {
      const url = typeof input === 'string' ? input : (input?.url || '')
      if (!isApiUrl(url)) {
        return origFetch(input, init)
      }

      const method = (init.method || 'GET').toUpperCase()
      let body = undefined
      if (init.body) {
        try { body = JSON.parse(init.body) } catch { body = undefined }
      }

      // Optional latency to mimic network
      if (MOCK_LATENCY_MS) await wait(MOCK_LATENCY_MS)

      const { pathname } = new URL(url, window.location.origin)

      if (pathname === '/api/login' && method === 'POST') return handleLogin(body)
      if (pathname === '/api/register' && method === 'POST') return handleRegister(body)
      if (pathname === '/api/forgot-password' && method === 'POST') return handleForgot(body)
      if (pathname === '/api/me' && method === 'GET') return handleMe(new Headers(init.headers))
      if (pathname === '/api/users' && method === 'GET') return handleUsers()
      if (pathname === '/api/health' && method === 'GET') return handleHealth()
      if (pathname === '/api' && method === 'GET') return handleHealth()

      // Fallback: 404 for unknown API route
      return jsonResponse({ success: false, message: 'Not Found' }, { status: 404 })
    } catch (err) {
      console.warn('[apiMock] error intercepting fetch', err)
      return jsonResponse({ success: false, message: 'Mock error' }, { status: 500 })
    }
  }
  window.__apiMockPatched = true
  if (import.meta.env?.DEV) console.info('[apiMock] Enabled browser API mocks')
}
