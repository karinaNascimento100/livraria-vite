import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

/*
  Header
  - Componente de topo com marca e links de navegação.
  - Exibe contadores dinâmicos para Carrinho e Favoritos (lidos da store).
  - Observação: o avatar usa fallback inline para evitar imagens quebradas.
*/

export default function Header() {
  const cart = useSelector(s => s.cart)
  const favorites = useSelector(s => s.favorites || [])
  const count = cart.reduce((acc, i) => acc + (i.qty || 1), 0)
  const favCount = favorites.length

  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner mainbar" role="navigation" aria-label="principal">
        <div className="brand">
          <img
            className="brand__avatar"
            src="/assets/img/logo/logogit.png"
            alt="Gato branco — logotipo do projeto"
            onError={(e) => {
              // Fallback inline SVG (white circle) to avoid broken images
              const svg = encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='#ffffff'/></svg>")
              e.currentTarget.src = `data:image/svg+xml;utf8,${svg}`
            }}
            style={{ background: 'transparent' }}
          />
          <span className="brand__title">Fullstack - Parada Obrigatória 2</span>
        </div>
        <nav aria-label="links" className="nav">
          <ul className="nav__list">
            <li><NavLink to="/" className="nav__link">Início</NavLink></li>
            <li><NavLink to="/sobre" className="nav__link">Sobre</NavLink></li>
            <li><NavLink to="/contato" className="nav__link">Contato</NavLink></li>
            <li><NavLink to="/conta" className="nav__link">Minha Conta</NavLink></li>
            <li>
              <NavLink
                to="/favorites"
                className="nav__link"
                title={`Favoritos — ${favCount} item${favCount !== 1 ? 's' : ''}`}
                aria-label={`Favoritos — ${favCount} item${favCount !== 1 ? 's' : ''}`}
              >
                Favoritos ({favCount})
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="nav__link"
                title={`Carrinho — ${count} item${count !== 1 ? 's' : ''}`}
                aria-label={`Carrinho — ${count} item${count !== 1 ? 's' : ''}`}
              >
                Carrinho ({count})
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
