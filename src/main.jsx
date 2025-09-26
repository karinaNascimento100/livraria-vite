import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// Tailwind (gerado) + CSS legado
import './tailwind.css'
import './index.css'

const root = createRoot(document.getElementById('root'))

async function bootstrap() {
  // Enable browser API mocks if configured
  if (import.meta.env.VITE_MOCK_API === 'true' || import.meta.env.VITE_MOCK_API === true) {
    const { enableApiMock } = await import('./mocks/apiMock')
    enableApiMock()
  }

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

bootstrap()
