import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

it('renderiza o cabeçalho com navegação', () => {
  render(<App />)
  expect(screen.getByRole('navigation', { name: /principal/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /catálogo/i })).toBeInTheDocument()
})
