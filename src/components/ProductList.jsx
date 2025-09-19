import React from 'react';
import { useDispatch } from 'react-redux';

export default function ProductList({ products = [] }) {
  const dispatch = useDispatch();

  const addToCart = (product) =>
    dispatch({ type: 'ADD_TO_CART', payload: product });

  return (
    <div className="row">
      {products.map(p => (
        <div className="col-4 col-12-mobile" key={p.id}>
          <article className="item">
            <a className="image fit" href="#">
              <img src={`/images/pic0${(p.id % 6) + 2}.jpg`} alt={p.name} />
            </a>
            <header>
              <h3>{p.name}</h3>
              <p>R$ {p.price.toFixed(2)}</p>
            </header>
            <button className="button" onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </article>
        </div>
      ))}
    </div>
  );
}
