import React from 'react'
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Header from './components/Header'
import BannerCarousel from './components/BannerCarousel'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Contact from './components/Contact'
import About from './components/About'
import AuthLogin from './components/AuthLogin'
import AuthRegister from './components/AuthRegister'

function SectionCatalog() {
  return (
    <section id="portfolio" className="two screen">
      <div className="container">
        <header>
          <h2>Catálogo</h2>
        </header>
        <ProductList />
      </div>
    </section>
  )
}

function SectionCart() {
  return (
    <section id="cart" className="two screen">
      <div className="container">
        <Cart />
      </div>
    </section>
  )
}

function SectionConta() {
  return (
    <section id="account" className="two screen">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <AuthLogin />
          </div>
          <div>
            <AuthRegister />
          </div>
        </div>
      </div>
    </section>
  )
}

// Catálogo padrão: 10 itens definidos em ProductList (imagens e preços)

const paymentLogos = [
  { name: 'Visa', src: 'https://leitura.com.br/app/cielo/images/visa.gif' },
  { name: 'Mastercard', src: 'https://leitura.com.br/app/cielo/images/mastercard.gif' },
  { name: 'American Express', src: 'https://leitura.com.br/app/cielo/images/amex.gif' },
  { name: 'Diners', src: 'https://leitura.com.br/app/cielo/images/diners.gif' },
  { name: 'Pix', src: 'https://static.estantevirtual.com.br/bnn/l_estantevirtual/2025-07-15/3688_pix.svg' },
  { name: 'Hipercard', src: 'https://leitura.com.br/app/cielo/images/hipercard.gif' },
  { name: 'Boleto', src: 'https://leitura.com.br/app/cielo/images/boleto.png' },
]

function AppInner() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
  <Header />
      {isHome && <BannerCarousel />}
      <div id="main">
        <Routes>
          <Route path="/" element={<SectionCatalog />} />
          <Route path="/products" element={<SectionCatalog />} />
          <Route path="/cart" element={<SectionCart />} />
          <Route path="/conta" element={<SectionConta />} />
          <Route path="/sobre" element={
            <section id="sobre" className="two about-theme screen">
              <div className="container">
                <About includeHeading={true} />
              </div>
            </section>
          } />
          <Route path="/contato" element={
            <section id="contato" className="two screen">
              <div className="container">
                <Contact />
              </div>
            </section>
          } />
        </Routes>
        <section id="about" className="three">
          <div className="container">
            <header>
              <h2>Formas de Pagamento</h2>
            </header>
            <ul className="payments">
              {paymentLogos.map(p => (
                <li key={p.name}>
                  <img
                    src={p.src}
                    alt={p.name}
                    onError={(e) => {
                      const text = encodeURIComponent(p.name)
                      const svg = `<?xml version='1.0' encoding='UTF-8'?><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 80'><rect width='100%' height='100%' fill='#111'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#e5e7eb' font-family='Arial, sans-serif' font-size='22'>${text}</text></svg>`
                      e.currentTarget.src = `data:image/svg+xml;utf8,${svg}`
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section id="contact" className="four">
          <div className="container">
            <header>
              <h2>Onde nos encontrar</h2>
            </header>
            <p>
              Endereço: Av. Orlando Gomes, 1845 - Piatã, Salvador - BA, 41650-010<br />
              Telefone: (71) 3462-9580<br />
              E-mail: <a href="mailto:sac@fullstack.com.br">sac@fullstack.com.br</a><br />
              E-mail (Privacidade): <a href="mailto:paradaobrigatoria1@fullstack.com.br">paradaobrigatoria1@fullstack.com.br</a><br />
              Horário de atendimento: Segunda a sexta, das 08h30 às 18h00 (exceto feriados)
            </p>
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
