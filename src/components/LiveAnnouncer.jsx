import React, { useEffect, useState } from 'react'

// LiveAnnouncer
// - Componente mínimo para manter uma região aria-live no DOM.
// - Exporta a função `announce(text)` para que outras partes da app
//   possam notificar leitores de tela sem alterar a interface visual.
// - A região é visivelmente oculta (usa a classe `sr-only` do Tailwind)
//   e é aria-atomic para garantir que a mensagem completa seja lida.

let _setMessage = null

export function announce(message) {
  try {
    if (typeof _setMessage === 'function') {
      _setMessage(String(message))
      return
    }
    // Fallback: se o componente não estiver inicializado, atualiza o elemento direto
    const el = typeof document !== 'undefined' && document.getElementById('livraria-announcer')
    if (el) el.textContent = String(message)
  } catch {
    // Não lançar erros para a UI; silenciosamente falha se algo der errado.
    // Comentário em português para fins educativos: em produção, um logger pode capturar isso.
  }
}

export default function LiveAnnouncer() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    _setMessage = setMessage
    return () => { _setMessage = null }
  }, [])

  return (
    <div
      id="livraria-announcer"
      className="sr-only"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  )
}
