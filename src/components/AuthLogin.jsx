import React, { useState } from 'react'

export default function AuthLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [status, setStatus] = useState(null)
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const resp = await fetch('/api/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.message || 'Falha no login')
      setStatus(`Bem-vindo, ${data?.data?.username}`)
    } catch (err) {
      setStatus(`Erro: ${err.message}`)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white rounded-md shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Entrar</h3>
      <label className="block text-sm font-medium">Usuário</label>
      <input name="username" value={form.username} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" required />
      <label className="block text-sm font-medium mt-3">Senha</label>
      <input type="password" name="password" value={form.password} onChange={onChange} className="mt-1 w-full border rounded px-3 py-2" required />
  <button className="mt-4 button">Entrar</button>
      {status && <div className="mt-3 text-sm">{status}</div>}
    </form>
  )
}
