import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

it('renderiza o cabeçalho com busca e links utilitários', () => {
  render(<App />)
  // Campo de busca
  expect(screen.getByRole('searchbox', { name: /buscar/i })).toBeInTheDocument()
  // Links utilitários no topo
  expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /minha conta/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /carrinho/i })).toBeInTheDocument()
})
