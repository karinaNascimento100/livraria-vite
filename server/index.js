const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes (API)
app.use('/api', require('./controllers/apiController'));

// Root (JSON to avoid second web site feel)
app.get('/', (req, res) => {
  res.json({ ok: true, name: 'Livraria API', version: '1.0.0', docs: '/api/health' })
});

// Error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
