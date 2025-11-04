const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares (cors, parsing de JSON/URL-encoded e arquivos estáticos)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
app.use('/api', require('./controllers/apiController'));

// Raiz: resposta JSON (evita servir outra página web na mesma porta)
app.get('/', (req, res) => {
  res.json({ ok: true, name: 'Livraria API', version: '1.0.0', docs: '/api/health' })
});

// Middleware de tratamento de erros
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
