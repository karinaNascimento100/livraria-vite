## Livraria Vite — Parada Obrigatória 1

Aplicação de livraria online implementada com Vite + React, Redux para gerenciamento do carrinho e React Router para navegação. Este README contempla orientações, proposta e etapas da atividade.

### Visão geral

- Build e dev server com Vite
- React Router (rotas: /, /products, /cart, /conta)
- Redux para carrinho (adicionar, decrementar, remover)
- Testes com Vitest + Testing Library
- ESLint (flat) e Prettier

## Orientações gerais (atividade)

- Atividade individual (pontuação: 7,0 pontos) com prazo no AVA.
- Temas contemplados: HTML, CSS, JavaScript, Node.js, componentes reutilizáveis (biblioteca JS), headers/cabeçalhos HTTP, frameworks JS e APIs avançadas.
- A avaliação seguirá a rubrica definida no AVA.

## Proposta

Implementar a funcionalidade de carrinho de compras de uma livraria online, aplicando gerenciamento de estado e componentização. O usuário pode adicionar produtos ao carrinho, visualizar os itens e removê-los.

## Escopo da entrega (Parada Obrigatória 1)

- O objeto de avaliação nesta etapa é exclusivamente a funcionalidade de carrinho de compras (adicionar, decrementar, remover e limpar itens, com totalização).
- As seções "Contato" e "Minha Conta" foram incluídas apenas para dar maior realismo e coerência de navegação, porém não fazem parte do escopo avaliado nesta Parada Obrigatória 1.
- O projeto continuará sendo evoluído após a entrega, com o aprofundamento dessas e de outras funcionalidades.

## Etapa 1 — Base do projeto (sem carrinho)

1) Configuração do projeto com Vite + React
2) Dependências para estado e rotas:

```powershell
npm install @reduxjs/toolkit react-redux react-router-dom
```

3) Configuração do Redux (arquivo `src/store.js`)

O projeto usa `configureStore` do RTK com um reducer simples do carrinho:

```js
import { configureStore } from '@reduxjs/toolkit'

const initialState = { cart: [] }

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cart.find(i => i.id === action.payload.id)
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(i => (
            i.id === action.payload.id ? { ...i, qty: (i.qty || 1) + 1 } : i
          )),
        }
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_FROM_CART': {
      const id = action.payload.id ?? action.payload
      return { ...state, cart: state.cart.filter(item => item.id !== id) }
    }
    case 'DECREMENT_QTY': {
      const id = action.payload.id ?? action.payload
      return {
        ...state,
        cart: state.cart
          .map(i => (i.id === id ? { ...i, qty: (i.qty || 1) - 1 } : i))
          .filter(i => (i.qty || 1) > 0),
      }
    }
    case 'CLEAR_CART': {
      return { ...state, cart: [] }
    }
    default:
      return state
  }
}

const store = configureStore({ reducer: cartReducer })
export default store
```

4) Provider do Redux + React Router (resumo)

O projeto envolve o `App` com `<Provider store={store}>` e usa `BrowserRouter` nas rotas (`react-router-dom@7`).

## Etapa 2 — Componentes e integração do carrinho

1) Catálogo (`ProductList.jsx`): renderiza lista, preço e botão “Comprar” que dispara `ADD_TO_CART`.
2) Carrinho (`Cart.jsx`): lê `cart` via `useSelector`, permite remover (`REMOVE_FROM_CART`) e decrementar (`DECREMENT_QTY`), além de limpar (`CLEAR_CART`).
3) Rotas (`App.jsx`): define `/`, `/products`, `/cart` e links no `Header.jsx`.

## Etapa 3 — Documentação e evidências

Para a entrega, gere um PDF contendo:
- Descrição do projeto e principais funcionalidades
- Capturas de tela que comprovem:
  1. Catálogo com lista e botão “Comprar”
  2. Item adicionado (contador no header)
  3. Página do carrinho com listagem
  4. Remoção/decremento de itens
  5. Total do carrinho atualizado

Sugestão de estrutura do PDF: capa, sumário, arquitetura (componentes/estado), funcionalidades do carrinho (prints + descrição), conclusão (lições e próximos passos).

### Checklist de evidências (para o PDF)

- [ ] Catálogo visível com títulos e botões “Comprar”
- [ ] Header com contador de itens no link “Carrinho”
- [ ] Página “Carrinho” listando itens com imagem, nome, atributos e total por item
- [ ] Ações funcionando: Remover, Diminuir quantidade, Esvaziar carrinho
- [ ] Total geral do carrinho atualizado e destacado
- [ ] Seções auxiliares (Sobre, Onde nos encontrar, Minha Conta) presentes para navegação

### Como rodar

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

### Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera build de produção
- `npm run preview` — serve o build localmente
- `npm test` — executa os testes (Vitest)
- `npm run test:watch` — testes em modo watch
- `npm run lint` — verifica lint (ESLint)
- `npm run lint:fix` — corrige lint automaticamente
- `npm run format` — checa formatação (Prettier)
- `npm run format:write` — formata arquivos com Prettier

### Estrutura principal

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

### Rotas e seções

- Home/Catálogo: `/` ou `/products` → renderiza `ProductList`
- Carrinho: `/cart` → renderiza `Cart`
- Minha Conta (exemplo): `/conta`
- Formas de Pagamento e Contato: seções na mesma página principal

### Catálogo e preços

- O catálogo padrão (10 itens) está em `src/components/ProductList.jsx` na constante `defaultProducts`.
- Cada item tem `id`, `image` e `price`.
- O preço é exibido abaixo da imagem e formatado em BRL.
- O botão “Comprar” adiciona o item ao carrinho.

Para trocar capas ou valores, edite `defaultProducts` ou passe `products` via props ao `ProductList`.

### Formas de pagamento

- Ícones/logos são renderizados em grade; tamanhos padronizados por CSS.
- Imagens externas têm fallback SVG com texto caso falhem.

### Onde nos encontrar

- Seção com endereço, telefone, e-mails e horário de atendimento.
- Mapa aponta para o SENAI CIMATEC e há link para abrir no Google Maps.

### Testes

```powershell
npm test
```

Há um teste básico em `src/App.test.jsx` verificando o cabeçalho/navegação.

### Qualidade de código

- ESLint 9 (flat config) + Prettier 3 já configurados.
- Ajuste as regras no `eslint.config.js` conforme necessário.

### Notas

- Os estilos do template original (main.css) não são mais utilizados; toda a base está em `public/assets/css/custom.css`.
- O cabeçalho é fixo (sticky); adicionamos espaçamento para que os títulos não grudem na linha divisória entre seções.

# Livraria Vite – Notas de Desenvolvimento

## Modo independente (sem serviços externos)

- Removemos os CDNs de Google Fonts e Font Awesome do `index.html` para que o projeto funcione offline.
- Adicionamos mocks de API no navegador que simulam os endpoints `/api` (login, register, forgot-password, users, me, health).
- Por padrão em desenvolvimento os mocks ficam ATIVOS via `.env.development`.

### Como funciona
- Quando `VITE_MOCK_API=true`, o app intercepta `fetch('/api/...')` no browser e responde localmente.
- Os mocks emulam o comportamento do backend simples usado no projeto (inclui usuários demo, mensagens padrão e token base64).

### Habilitar/Desabilitar mocks
- Desenvolvimento (padrão): `VITE_MOCK_API=true` no `.env.development`.
- Para usar o backend real, defina `VITE_MOCK_API=false` (ou remova a variável) e execute o servidor API (porta 3001). O Vite já tem proxy `/api` → `http://localhost:3001` no `vite.config.js`.

### Endpoints simulados
- POST `/api/login` → `{ success, message, token, user }` | mensagens: "Login successful! Welcome back." ou "Invalid username or password". Após 3 falhas, bloqueia (opcional).
- POST `/api/register` → valida campos e unicidade; retorna `{ success, user }` com 201.
- POST `/api/forgot-password` → `{ success: true, newPassword: 'newpassword' }`.
- GET `/api/users` → lista usuários demo (username/email).
- GET `/api/me` → requer `Authorization: Bearer <token>` do login.
- GET `/api/health` ou `/api` → status do mock.
