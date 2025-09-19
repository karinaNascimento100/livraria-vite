import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const cart = useSelector(s => s.cart);
  const count = cart.reduce((acc, i) => acc + (i.qty || 1), 0);

  return (
    <>
      <div className="top">
        <div id="logo">
          <span className="image avatar48">
            <img src="/images/avatar.jpg" alt="Avatar" />
          </span>
          <h1 id="title">Karina</h1>
          <p>Livraria Online</p>
        </div>
        <nav id="nav">
          <ul>
            <li>
              <NavLink to="/" end id="top-link">
                <span className="icon solid fa-home">Intro</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" id="portfolio-link">
                <span className="icon solid fa-th">Catálogo</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" id="contact-link">
                <span className="icon solid fa-shopping-cart">
                  Carrinho ({count})
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="bottom">
        <ul className="icons">
          <li><a href="#" className="icon brands fa-github"><span className="label">GitHub</span></a></li>
          <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
          <li><a href="mailto:contato@exemplo.com" className="icon solid fa-envelope"><span className="label">Email</span></a></li>
        </ul>
      </div>
    </>
  );
}
