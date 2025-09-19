import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Cart() {
  const cart = useSelector(s => s.cart);
  const dispatch = useDispatch();

  const remove = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  const dec = (id) => dispatch({ type: 'DECREMENT_QTY', payload: { id } });
  const total = cart.reduce((acc, i) => acc + (i.price * (i.qty || 1)), 0);

  if (!cart.length) return <p>Seu carrinho está vazio.</p>;

  return (
    <div className="container">
      <header><h2>Your Cart</h2></header>
      {cart.map(item => (
        <article className="item" key={item.id}>
          <header>
            <h3>{item.name}</h3>
            <p>Qtd: {item.qty || 1} • R$ {(item.price * (item.qty || 1)).toFixed(2)}</p>
          </header>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', paddingBottom: '1rem' }}>
            <button className="button" onClick={() => dec(item.id)}>-1</button>
            <button className="button" onClick={() => remove(item.id)}>Remove</button>
          </div>
        </article>
      ))}
      <h3>Total: R$ {total.toFixed(2)}</h3>
    </div>
  );
}
