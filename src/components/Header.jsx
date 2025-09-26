import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Header() {
  const cart = useSelector(s => s.cart)
  const count = cart.reduce((acc, i) => acc + (i.qty || 1), 0)

  return (
    <header className="site-header">
      {/* Main bar: logo à esquerda, links à direita */}
      <div className="site-header__inner mainbar">
        <div className="brand">
          <img
            className="brand__avatar"
            src="https://th.bing.com/th/id/ODF.gkppZSyoAK5-LbHPbD7WwA?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2"
            alt="Avatar"
            onError={(e) => {
              // Fallback: simple white circle for contrast
              const svg = encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='#ffffff'/></svg>")
              e.currentTarget.src = `data:image/svg+xml;utf8,${svg}`
            }}
          />
          <span className="brand__title">Fullstack - Parada Obrigatória 1</span>
        </div>
        <nav aria-label="links" className="nav">
          <ul className="nav__list">
            <li><NavLink to="/sobre" className="nav__link">Sobre</NavLink></li>
            <li><NavLink to="/contato" className="nav__link">Contato</NavLink></li>
            <li><NavLink to="/conta" className="nav__link">Minha Conta</NavLink></li>
            <li><NavLink to="/cart" className="nav__link">Carrinho ({count})</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
