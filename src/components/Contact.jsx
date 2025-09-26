import React, { useState } from 'react'

import { Link } from 'react-router-dom'

export default function Contact() {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    assunto: '',
    mensagem: '',
  })
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const validatePhone = (raw) => {
    // aceita apenas números, 10 ou 11 dígitos (ex.: 7133330000, 71999990000)
    return /^\d{10,11}$/.test((raw || '').trim())
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validatePhone(form.telefone)) {
      alert('Telefone inválido. Digite apenas números com DDD (10 a 11 dígitos).')
      return
    }
    // Simulação de envio
    setSent(true)
    setForm({ nome: '', telefone: '', email: '', assunto: '', mensagem: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="space-y-1 text-gray-700">
          <p><strong>Telefones:</strong> (71) 3462-9580</p>
          <p><strong>E-mail:</strong> sac@fullstack.com.br</p>
          <p><strong>Endereço:</strong> Av. Orlando Gomes, 1845 - Piatã, Salvador - BA, 41650-010</p>
        </div>
        <iframe
          className="rounded-lg mt-3"
          src="https://www.google.com/maps?q=-12.9704,-38.5124&z=15&output=embed"
          width="100%"
          height="220"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa"
        />

        <h2 className="text-xl font-semibold text-gray-800 mt-6">Formulário de Contato</h2>
        <form className="mt-3" onSubmit={onSubmit} noValidate>
          <label className="block text-sm font-medium text-gray-700" htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            type="text"
            required
            value={form.nome}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen"
          />

          <label className="block text-sm font-medium text-gray-700 mt-3" htmlFor="telefone">Telefone de contato</label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            required
            pattern="\\d{10,11}"
            placeholder="Apenas números, ex: 71999990000 ou 7133330000"
            title="Digite apenas números, com DDD 71. Ex: 71999990000 ou 7133330000"
            value={form.telefone}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen"
          />

          <label className="block text-sm font-medium text-gray-700 mt-3" htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen"
          />

          <label className="block text-sm font-medium text-gray-700 mt-3" htmlFor="assunto">Assunto</label>
          <input
            id="assunto"
            name="assunto"
            type="text"
            required
            value={form.assunto}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen"
          />

          <label className="block text-sm font-medium text-gray-700 mt-3" htmlFor="mensagem">Mensagem</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows={4}
            required
            maxLength={500}
            value={form.mensagem}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-primaryGreen resize-none"
            style={{ minHeight: 100, maxHeight: 100 }}
          />

          <div className="mt-3 flex items-center gap-3">
            <button type="submit" className="bg-primaryGreen text-white px-4 py-2 rounded-md font-medium hover:bg-green-600">
              Enviar
            </button>
            <button
              type="reset"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-300"
              onClick={() => setForm({ nome: '', telefone: '', email: '', assunto: '', mensagem: '' })}
            >
              Limpar
            </button>
          </div>
        </form>

        {sent && (
          <div className="text-primaryGreen font-semibold mt-4" role="status">
            Mensagem enviada com sucesso!
          </div>
        )}

        <div className="mt-6">
          <Link to="/" className="inline-block text-white bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700">
            &larr; Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
