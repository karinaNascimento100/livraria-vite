## Livraria Vite — Parada Obrigatória 1

Aplicação web simples de livraria feita com Vite + React. Catálogo com 10 livros (capas), botão “Comprar” que adiciona ao carrinho (Redux), lista de formas de pagamento e seção de contato.

### 👀 Visão geral

- Build e dev server com Vite
- React Router (rotas: /, /products, /cart, /conta)
- Redux para carrinho (adicionar, decrementar, remover)
- Testes com Vitest + Testing Library
- ESLint (flat) e Prettier

### 🚀 Como rodar

1) Instale as dependências

```powershell
npm install
```

2) Ambiente de desenvolvimento

```powershell
npm run dev
# abre http://localhost:5173
```

3) Build de produção

```powershell
npm run build
# saída em /dist
```

4) Pré-visualização do build

```powershell
npm run preview
```

### 🧩 Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera build de produção
- `npm run preview` — serve o build localmente
- `npm test` — executa os testes (Vitest)
- `npm run test:watch` — testes em modo watch
- `npm run lint` — verifica lint (ESLint)
- `npm run lint:fix` — corrige lint automaticamente
- `npm run format` — checa formatação (Prettier)
- `npm run format:write` — formata arquivos com Prettier

### 🗂️ Estrutura principal

```
public/
  assets/css/custom.css   # estilos atuais (base, header, catálogo, pagamentos, contato)
src/
  App.jsx                 # layout, seções e rotas
  main.jsx                # bootstrap React
  store.js                # Redux store + reducers do carrinho
  components/
    Header.jsx            # topo (links, busca, carrinho)
    ProductList.jsx       # catálogo (10 itens padrão, preço + botão)
    Cart.jsx              # carrinho (lista, decremento e remoção)
```

### 🧭 Rotas e seções

- Home/Catálogo: `/` ou `/products` → renderiza `ProductList`
- Carrinho: `/cart` → renderiza `Cart`
- Minha Conta (exemplo): `/conta`
- Formas de Pagamento e Contato: seções na mesma página principal

### 🛒 Catálogo e preços

- O catálogo padrão (10 itens) está em `src/components/ProductList.jsx` na constante `defaultProducts`.
- Cada item tem `id`, `image` e `price`.
- O preço é exibido abaixo da imagem e formatado em BRL.
- O botão “Comprar” adiciona o item ao carrinho.

Para trocar capas ou valores, edite `defaultProducts` ou passe `products` via props ao `ProductList`.

### 💳 Formas de pagamento

- Ícones/logos são renderizados em grade; tamanhos padronizados por CSS.
- Imagens externas têm fallback SVG com texto caso falhem.

### ✉️ Contato

- Seção com endereço, telefone, e-mails e horário de atendimento.

### 🧪 Testes

```powershell
npm test
```

Há um teste básico em `src/App.test.jsx` verificando o cabeçalho/navegação.

### ✅ Qualidade de código

- ESLint 9 (flat config) + Prettier 3 já configurados.
- Ajuste as regras no `eslint.config.js` conforme necessário.

### 📝 Notas

- Os estilos do template original (main.css) não são mais utilizados; toda a base está em `public/assets/css/custom.css`.
- O cabeçalho é fixo (sticky); adicionamos espaçamento para que os títulos não grudem na linha divisória entre seções.
