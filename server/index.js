const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// Load canonical .env at repo root as the single source of truth for HOST/PORT
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '127.0.0.1';

// Security and parsing
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiter for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

// API routes (always under /api)
app.use('/api', apiLimiter, require('./controllers/apiController'));

// Lightweight health endpoint for orchestration/tools
app.get('/api/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

// Serve frontend build (dist) if present, otherwise fall back to server/public
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  // SPA fallback
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, 'public')));
  // Simple root JSON for API-only mode
  app.get('/', (req, res) => {
    res.json({ ok: true, name: 'Livraria API', version: '1.0.0', docs: '/api/health' });
  });
}

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err && err.stack ? err.stack : err);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, HOST, () => {
  console.log(`✅ App (API + Front) em http://${HOST}:${PORT}`);
});
