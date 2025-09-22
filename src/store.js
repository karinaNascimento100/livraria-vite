import { configureStore } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

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
export default store
