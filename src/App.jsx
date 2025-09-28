import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Header from './components/Header'
import Banner from './components/Banner'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Contact from './components/Contact'
import About from './components/About'
import AuthLogin from './components/AuthLogin'
import AuthRegister from './components/AuthRegister'

function SectionCatalog() {
  return (
    <section id="portfolio" className="two">
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
    <section id="cart" className="two">
      <div className="container">
        <header>
          <h2>Carrinho</h2>
        </header>
        <Cart />
      </div>
    </section>
  )
}

function SectionConta() {
  return (
    <section id="account" className="two">
      <div className="container">
        <header><h2>Minha Conta</h2></header>
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
  return (
    <>
      <Header />
      <Banner
        src="https://images.unsplash.com/photo-1600499373255-383d44270304?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGxpYnJhcnl8ZW58MHwwfDB8fHww"
        srcSet="
          https://images.unsplash.com/photo-1600499373255-383d44270304?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGxpYnJhcnl8ZW58MHwwfDB8fHww 600w,
          https://images.unsplash.com/photo-1600499373255-383d44270304?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGxpYnJhcnl8ZW58MHwwfDB8fHww 900w,
          https://images.unsplash.com/photo-1600499373255-383d44270304?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGxpYnJhcnl8ZW58MHwwfDB8fHww 1200w,
          https://images.unsplash.com/photo-1600499373255-383d44270304?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGxpYnJhcnl8ZW58MHwwfDB8fHww 1600w,
          https://images.unsplash.com/photo-1600499373255-383d44270304?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGxpYnJhcnl8ZW58MHwwfDB8fHww 2000w
        "
        sizes="100vw"
        alt="Biblioteca — Unsplash"
        heightClass="max-h-72 md:max-h-96"
        fit="cover"
        position="center"
      />
      <div id="main">
        <Routes>
          <Route path="/" element={<SectionCatalog />} />
          <Route path="/products" element={<SectionCatalog />} />
          <Route path="/cart" element={<SectionCart />} />
          <Route path="/conta" element={<SectionConta />} />
          <Route path="/sobre" element={
            <section id="sobre" className="two about-theme">
              <div className="container">
                <header><h2>Sobre</h2></header>
                <About includeHeading={true} />
              </div>
            </section>
          } />
          <Route path="/contato" element={
            <section id="contato" className="two">
              <div className="container">
                <header><h2>Onde nos encontrar</h2></header>
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
