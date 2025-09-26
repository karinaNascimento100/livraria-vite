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
        <p>Área do cliente (exemplo).</p>
      </div>
    </section>
  )
}

// Catálogo usa lista padrão de 10 capas em ProductList (imagens)

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
        src="data:image/jpeg;base64,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"
        alt="Banner tecnologia e leitura"
        heightClass="max-h-64"
        fit="cover"
        position="center"
      />
      <div id="main">
        <section id="top" className="one dark cover">
          <div className="container">
            <header>
              <h2 className="alt">
                Bem-vinda à <strong>Livraria Online</strong> — Parada Obrigatória 1.
              </h2>
              <p>Adicione livros ao carrinho, veja itens e remova quando quiser.</p>
            </header>
            {/* CTA removido conforme solicitação */}
          </div>
        </section>
        <Routes>
          <Route path="/" element={<SectionCatalog />} />
          <Route path="/products" element={<SectionCatalog />} />
          <Route path="/cart" element={<SectionCart />} />
          <Route path="/conta" element={<SectionConta />} />
          <Route path="/sobre" element={
            <section id="sobre" className="two">
              <div className="container">
                <header><h2>Sobre</h2></header>
                <About includeHeading={true} />
              </div>
            </section>
          } />
          <Route path="/contato" element={
            <section id="contato" className="two">
              <div className="container">
                <header><h2>Contato</h2></header>
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
              <h2>Contato</h2>
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
