# Livraria Vite — Parada Obrigatória 2

Repositório base para a segunda Parada Obrigatória. Mantemos a estrutura do projeto da entrega anterior, mas o foco agora é **avaliar e aprimorar a acessibilidade** da aplicação conforme as etapas abaixo.

---

## Etapa 1 · Configuração inicial

1. **Instalação de dependências essenciais**

   ```powershell
   npm install redux react-redux react-router-dom
   ```

2. **Configuração do Redux (`src/store.js`)**

   ```js
   import { createStore } from 'redux'

   const initialState = { cart: [] }

   const cartReducer = (state = initialState, action) => {
     switch (action.type) {
       case 'ADD_TO_CART':
         return { ...state, cart: [...state.cart, action.payload] }
       case 'REMOVE_FROM_CART':
         return { ...state, cart: state.cart.filter(item => item.id !== action.payload.id) }
       default:
         return state
     }
   }

   const store = createStore(cartReducer)
   export default store
   ```

3. **Provider do Redux (`src/main.jsx`)**

   ```js
   import React from 'react'
   import ReactDOM from 'react-dom/client'
   import { Provider } from 'react-redux'
   import store from './store'
   import App from './App'

   ReactDOM.createRoot(document.getElementById('root')).render(
     <Provider store={store}>
       <App />
     </Provider>
   )
   ```

---

## Etapa 1 · Componentes base

### `ProductList`

```js
import React from 'react'
import { useDispatch } from 'react-redux'

const ProductList = ({ products }) => {
  const dispatch = useDispatch()

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}

export default ProductList
```

### `Cart`

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Cart = () => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product })
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>
      ))}
    </div>
  )
}

export default Cart
```

### `App.jsx` (rotas básicas)

```js
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

const products = [
  { id: 1, name: 'Book 1' },
  { id: 2, name: 'Book 2' }
]

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <ProductList products={products} />
        </Route>
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  )
}

export default App
```

---

## Etapa 2 · Análise e melhorias de acessibilidade

### 1. Auditoria inicial (Lighthouse)

- Abrir a aplicação no Chrome.
- DevTools → aba **Lighthouse** → selecionar **Accessibility** → *Generate report*.
- Salvar o relatório para comparação posterior.

### 2. Melhorias obrigatórias

| Problema | Ação recomendada |
|----------|------------------|
| Imagens sem descrição | Garantir `alt` informativo; usar `alt=""` em imagens decorativas |
| Hierarquia de cabeçalhos quebrada | Manter apenas um `<h1>` por página, seguir ordem `<h2>`, `<h3>` etc. |
| Navegação por teclado deficiente | Certificar que todos os controles recebem foco e respondem a `Enter`/`Space`; ajustar `tabindex` quando necessário |
| Elementos sem rótulo | Usar `aria-label`, `aria-live`, `aria-hidden` conforme apropriado |

### 3. Testes assistivos

- **NVDA** (Windows): navegar usando apenas teclado, observar leitura e anunciar ajustes.
- Documentar todos os problemas encontrados e as correções aplicadas.

### 4. Auditoria final

- Reexecutar o Lighthouse.
- Comparar métricas antes/depois.
- Listar melhorias implementadas.

---

## Etapa 3 · Documentação de entrega

Preparar um PDF (`SeuNome_ProjetoLivrariaOnline_Acessibilidade.pdf`) contendo:

1. **Descrição do projeto**
2. **Diagnóstico inicial**
   - Capturas antes das correções
   - Principais problemas encontrados
3. **Melhorias aplicadas**
   - Capturas após ajustes
   - Justificativa de como cada melhoria beneficia a acessibilidade
4. **Testes**
   - Resultados do Lighthouse final
   - Relato do uso de leitores de tela (NVDA)
5. **Repositório**
   - Link para o código no GitHub

Enviar o documento finalizado pelo AVA.

---

## Como rodar o projeto

```powershell
npm install
npm run dev        # http://localhost:5173
npm run build
npm run preview
```

Scripts adicionais: `npm test`, `npm run lint`, `npm run format`.

---

## Estrutura sugerida

```
public/
  assets/
    css/
    img/
src/
  components/
    ProductList.jsx
    Cart.jsx
  store.js
  App.jsx
  main.jsx
```

As seções adicionais (Sobre, Contato, Minha Conta) permanecem para dar realismo e serão também avaliadas quanto à acessibilidade.
