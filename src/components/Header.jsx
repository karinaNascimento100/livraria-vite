import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
  const cart = useSelector(s => s.cart)
  const count = cart.reduce((acc, i) => acc + (i.qty || 1), 0)

  return (
    <header className="site-header">
      {/* Utility bar: localização, contato, conta, carrinho */}
      <div className="topbar">
        <ul className="topbar__list">
          <li><a href="#contact" className="topbar__link">Contato</a></li>
          <li><NavLink to="/conta" className="topbar__link">Minha Conta</NavLink></li>
          <li><NavLink to="/cart" className="topbar__link">Carrinho ({count})</NavLink></li>
        </ul>
      </div>

      {/* Main bar: logo + navegação principal */}
      <div className="site-header__inner mainbar">
        <div className="brand">
          <img className="brand__avatar" src="https://placehold.co/32x32" alt="Avatar" />
          <span className="brand__title">Fullstack - Parada Obrigatória 1</span>
        </div>
        <form className="search" role="search" action="/products">
          <input name="q" type="search" placeholder="Buscar livros..." aria-label="Buscar" />
        </form>
        <nav className="nav" aria-label="principal">
          <ul className="nav__list">
            <li>
              <NavLink to="/" end className="nav__link">Início</NavLink>
            </li>
            <li>
              <NavLink to="/products" className="nav__link">Catálogo</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
