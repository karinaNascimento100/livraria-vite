import { render, screen } from '@testing-library/react'
import App from './App'

it('renderiza o link "Ver Livros"', () => {
  render(<App />)
  expect(screen.getByRole('link', { name: /ver livros/i })).toBeInTheDocument()
})
