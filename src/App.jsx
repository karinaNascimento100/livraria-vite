import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

const products = [
  { id: 1, name: 'Biblioteca React', price: 129.9 },
  { id: 2, name: 'CSS & HTML', price: 149.9 },
  { id: 3, name: 'JavaScript', price: 89.9 },
]

function AppInner() {
  return (
    <>
      <div id="header">
        <Header />
      </div>
      <div id="main">
        <section id="top" className="one dark cover">
          <div className="container">
            <header>
              <h2 className="alt">
                Bem-vinda à <strong>Livraria Online</strong> — Parada Obrigatória 1.
              </h2>
              <p>Adicione livros ao carrinho, veja itens e remova quando quiser.</p>
            </header>
            <footer>
              <Link to="/products" className="button scrolly">Ver Livros</Link>
            </footer>
          </div>
        </section>
        <section id="portfolio" className="two">
          <div className="container">
            <header><h2>Catálogo</h2></header>
            <Routes>
              <Route path="/" element={<ProductList products={products} />} />
              <Route path="/products" element={<ProductList products={products} />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </section>
        <section id="about" className="three">
          <div className="container">
            <header><h2>Sobre a Loja</h2></header>
            <p>Exemplo da disciplina: Redux + Router integrados ao template Prologue.</p>
          </div>
        </section>
        <section id="contact" className="four">
          <div className="container">
            <header><h2>Contato</h2></header>
            <p>Este bloco replica o visual do template. Integração 100% via CSS existente.</p>
          </div>
        </section>
      </div>
      <div id="footer">
        <ul className="copyright">
          <li>&copy; Livraria Online.</li>
          <li>Design: HTML5 UP • Prologue</li>
        </ul>
      </div>
    </>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </Provider>
  )
}
