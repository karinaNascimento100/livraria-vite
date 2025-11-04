import { configureStore } from '@reduxjs/toolkit'

/*
  store.js
  - Implementação simples de um reducer que gerencia `cart` e `favorites`.
  - Persistência: estado mínimo (cart, favorites) é salvo em localStorage em cada alteração.
  - A store usa o `configureStore` do Redux Toolkit mas um reducer "case-switch" simples
    é utilizado para manter o projeto enxuto e fácil de entender para fins acadêmicos.

  Como clonar e testar localmente:
  1. git clone <repo>
  2. npm install
  3. npm run dev
  4. Favoritar um produto em `/products` e verificar `/favorites` e `/cart`.
*/

// --- Persistência simples em localStorage ---
function loadState() {
  try {
    const raw = localStorage.getItem('livraria_state')
    if (!raw) return { cart: [], favorites: [] }
    const parsed = JSON.parse(raw)
    return {
      cart: Array.isArray(parsed.cart) ? parsed.cart : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
    }
  } catch (err) {
    // Em caso de erro (JSON malformado, etc.) retornar estado limpo
    console.warn('Falha ao carregar estado do localStorage', err)
    return { cart: [], favorites: [] }
  }
}

function saveState(state) {
  try {
    const toSave = { cart: state.cart || [], favorites: state.favorites || [] }
    localStorage.setItem('livraria_state', JSON.stringify(toSave))
  } catch (err) {
    // Ignore erros de escrita (ex.: quota excedida)
    console.warn('Falha ao salvar estado no localStorage', err)
  }
}

const initialState = loadState()

// --- Reducer principal (cart + favorites) ---
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cart.find(i => i.id === action.payload.id)
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i.id === action.payload.id ? { ...i, qty: (i.qty || 1) + 1 } : i
          ),
        }
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
    }

    case 'ADD_FAVORITE': {
      const exists = state.favorites.find(i => i.id === action.payload.id)
      if (exists) return state
      return { ...state, favorites: [...state.favorites, { ...action.payload }] }
    }

    case 'REMOVE_FAVORITE': {
      const id = action.payload.id ?? action.payload
      return { ...state, favorites: state.favorites.filter(item => item.id !== id) }
    }

    case 'MOVE_FAVORITE_TO_CART': {
      // Remove favorito e adiciona ao carrinho (incrementa qty se já existir)
      const id = action.payload.id ?? action.payload
      const item = state.favorites.find(i => i.id === id)
      if (!item) return state
      const existsInCart = state.cart.find(i => i.id === id)
      const newCart = existsInCart
        ? state.cart.map(i => i.id === id ? { ...i, qty: (i.qty || 1) + 1 } : i)
        : [...state.cart, { ...item, qty: 1 }]
      return { ...state, cart: newCart, favorites: state.favorites.filter(i => i.id !== id) }
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

const store = configureStore({
  reducer: cartReducer,
})

// Subscrever para persistir alterações em cart/favorites (salva de forma simples e resiliente)
store.subscribe(() => {
  try {
    const state = store.getState()
    saveState(state)
  } catch (err) {
    // Evitar quebrar a aplicação caso a persistência falhe
    // Erros são apenas logados
    console.warn('Erro ao persistir estado', err)
  }
})

export default store
