import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

it('renderiza o cabeçalho com links utilitários', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /minha conta/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /carrinho/i })).toBeInTheDocument()
})
