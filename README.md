# livraria-vite

## Explicação técnica — Migração CRA → Vite

Esta nota explica por que e como migrar de Create React App (CRA) para Vite, com foco prático para quem usa VS Code em Windows.

### 1) Contexto

- CRA (Create React App): usa react-scripts → Webpack + Babel.
- Vite: usa esbuild (dev) e Rollup (build). Muito mais rápido.
- Problemas comuns no CRA: build lento, HMR instável, configuração engessada.
- Vantagens do Vite: startup quase instantânea, HMR sólido, configuração clara via `vite.config.js`.

### 2) Estrutura de pastas esperada

CRA

- /public
  - index.html
- /src
  - index.js(x)
  - App.js(x)
- package.json (usa react-scripts)

Vite

- /public
  - index.html ← diferente, o Vite injeta o script
- /src
  - main.jsx ← entrypoint padrão
  - App.jsx
- vite.config.js
- package.json (scripts: dev/build/preview)

### 3) Scripts no package.json

CRA

```
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test"
}
```

Vite

```
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### 4) Variáveis de ambiente

- CRA → `process.env.REACT_APP_API_URL`
- Vite → `import.meta.env.VITE_API_URL`

Ação: renomear no `.env` (prefixo `REACT_APP_` → `VITE_`) e atualizar as referências no código.

### 5) HTML base

CRA (`public/index.html`)

```
<div id="root"></div>
```

CRA injeta o JS automaticamente.

Vite (`public/index.html`)

```
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

No Vite, o script de entrada é declarado no HTML.

### 6) Entrypoint

CRA (`src/index.jsx`)

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

Vite (`src/main.jsx`) — idêntico; muda apenas o nome do arquivo.

### 7) Testes

- CRA → Jest vem pronto.
- Vite → usar Vitest + Testing Library.

### 8) Passo a passo da migração

1. Criar projeto Vite:
   ```powershell
   npm create vite@latest minha-app -- --template react
   cd minha-app
   npm install
   ```
2. Copiar `src/` e `public/` do CRA para o novo projeto (ajustando colisões conforme necessário).
3. Ajustar `public/index.html` do Vite para incluir o script:
   ```html
   <script type="module" src="/src/main.jsx"></script>
   ```
4. Renomear variáveis de ambiente (`REACT_APP_` → `VITE_`) e trocar `process.env.REACT_APP_*` por `import.meta.env.VITE_*` no código.
5. Rodar o dev server e testar:
   ```powershell
   npm run dev
   # abre http://localhost:5173
   ```
6. Ajustar build/deploy:
   ```powershell
   npm run build
   # saída em /dist
   ```

### 9) Quando manter CRA

- Projetos legados ou cursos que exigem `react-scripts`.
- Quando o time não quer mexer em configuração agora.

### 10) Quando migrar para Vite

- Novos projetos.
- Precisamos de builds rápidos.
- Queremos flexibilidade (plugins, PWA, TS, Vue, Svelte, etc.).

### Conclusão (para o colega que usa VS Code)

Se o projeto ainda está no começo e não depende de nada preso ao `react-scripts`, vale migrar agora. A principal mudança de código é nas variáveis de ambiente (`process.env.REACT_APP_*` → `import.meta.env.VITE_*`). O resto é copiar `src/` e ajustar o `index.html`. O ganho de performance compensa.
