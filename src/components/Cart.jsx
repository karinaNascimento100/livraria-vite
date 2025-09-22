import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Cart() {
  const cart = useSelector(s => s.cart)
  const dispatch = useDispatch()

  const remove = id => dispatch({ type: 'REMOVE_FROM_CART', payload: { id } })
  const dec = id => dispatch({ type: 'DECREMENT_QTY', payload: { id } })
  const toBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
  const total = cart.reduce((acc, i) => acc + i.price * (i.qty || 1), 0)

  if (!cart.length)
    return (
      <div>
        <p>Seu carrinho está vazio.</p>
        <p>
          <Link to="/products" className="button">Continuar comprando</Link>
        </p>
      </div>
    )

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <Link to="/products" className="button">Continuar comprando</Link>
        <button className="button alt" onClick={() => dispatch({ type: 'CLEAR_CART' })}>Esvaziar carrinho</button>
      </div>
      {cart.map(item => (
        <article className="item" key={item.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '1rem', alignItems: 'start', padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
          <div className="image" style={{ width: 100 }}>
            <img src={item.image} alt={item.name || 'Livro'} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#374151' }}>Vendido por {item.seller || 'Livraria Online'}</div>
            <h3 style={{ margin: '0.25rem 0' }}>{item.name || 'Livro'}</h3>
            {item.isbn && <div>ISBN: {item.isbn}</div>}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: '#374151' }}>
              {item.condition && <span>{item.condition}</span>}
              {item.year && <span>Ano: {item.year}</span>}
              {item.weight && <span>Peso: {item.weight}</span>}
              {item.language && <span>Idioma: {item.language}</span>}
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <label style={{ marginRight: '0.5rem' }}>Quantidade:</label>
              <button className="button" onClick={() => dec(item.id)}>-1</button>
              <span style={{ margin: '0 0.5rem' }}>{item.qty || 1}</span>
              <button className="button" onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}>+1</button>
              <button className="button alt" style={{ marginLeft: '0.5rem' }} onClick={() => remove(item.id)}>Remover</button>
            </div>
            {item.seller && (
              <div style={{ marginTop: '0.5rem' }}>
                <Link to={`/products?q=${encodeURIComponent(item.seller)}`} className="button">Adicionar mais livros desse vendedor</Link>
              </div>
            )}
          </div>
          <div style={{ textAlign: 'right', minWidth: 100, fontWeight: 700 }}>{toBRL(item.price * (item.qty || 1))}</div>
        </article>
      ))}
      <h3 style={{ textAlign: 'right' }}>Total: {toBRL(total)}</h3>
    </div>
  )
}
