import React from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const defaultProducts = [
  {
    id: 1,
    name: 'Vantagem Competitiva - Criando e Sustentando Um Desempenho Superior',
    image: 'https://leitura.com.br/image/cache/products/9788539648542-228x228.jpg',
    price: 35.0,
    seller: 'Sebo Abbondanza',
    isbn: '9788570015587',
    condition: 'usado',
    year: 1996,
    weight: '850g',
    language: 'Português',
  },
  { id: 2,  name: 'Livro 2', image: 'https://leitura.com.br/image/cache/products/9788575225202-228x228.jpg', price: 99.9, seller: 'Livraria Online' },
  { id: 3,  name: 'Livro 3', image: 'https://leitura.com.br/image/cache/products/9786586057089-228x228.jpg', price: 139.9, seller: 'Livraria Online' },
  { id: 4,  name: 'Livro 4', image: 'https://leitura.com.br/image/cache/products/9788576088455-228x228.jpg', price: 89.9, seller: 'Livraria Online' },
  { id: 5,  name: 'Livro 5', image: 'https://leitura.com.br/image/cache/products/9788576087441-228x228.jpg', price: 79.9, seller: 'Livraria Online' },
  { id: 6,  name: 'Livro 6', image: 'https://leitura.com.br/image/cache/products/9788543019147-228x228.jpg', price: 119.9, seller: 'Livraria Online' },
  { id: 7,  name: 'Livro 7', image: 'https://leitura.com.br/image/cache/products/9788575226568-228x228.jpg', price: 109.9, seller: 'Livraria Online' },
  { id: 8,  name: 'Livro 8', image: 'https://leitura.com.br/image/cache/products/9788535210194-228x228.jpg', price: 149.9, seller: 'Livraria Online' },
  { id: 9,  name: 'Livro 9', image: 'https://leitura.com.br/image/cache/products/9788586804960-228x228.jpg', price: 94.9, seller: 'Livraria Online' },
  { id: 10, name: 'Livro 10', image: 'https://leitura.com.br/image/cache/products/9786586057393-228x228.jpg', price: 89.9, seller: 'Livraria Online' },
]

export default function ProductList({ products = defaultProducts }) {
  const dispatch = useDispatch()
  const { search } = useLocation()
  const q = new URLSearchParams(search).get('q')?.toLowerCase() || ''
  const filtered = q
    ? products.filter(p =>
        ((p.name || '').toLowerCase().includes(q)) || ((p.seller || '').toLowerCase().includes(q))
      )
    : products

  const addToCart = (p) => {
    // Garantir price para não quebrar o carrinho (fallback 0)
    const priceSafe = typeof p.price === 'number' ? p.price : 0
    dispatch({ type: 'ADD_TO_CART', payload: { ...p, price: priceSafe } })
  }

  return (
    <div className="row">
      {filtered.map(p => (
        <div className="col-1-5 col-12-mobile" key={p.id}>
          <article className="item">
            <div className="image fit">
              <img
                src={p.image}
                alt={p.name || 'Livro'}
                loading="lazy"
                onError={(e) => {
                  const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'><rect width='100%' height='100%' fill='#1f2937'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#e5e7eb' font-family='Arial, sans-serif' font-size='24'>Capa</text></svg>`)
                  e.currentTarget.src = `data:image/svg+xml;utf8,${svg}`
                }}
              />
            </div>
            <div className="price">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(typeof p.price === 'number' ? p.price : 0)}</div>
            <div className="actions">
              <button
                type="button"
                className="button button-sm"
                aria-label={`Adicionar ${(p.name || 'livro')} ao carrinho`}
                onClick={() => addToCart(p)}
              >
                Comprar
              </button>
            </div>
          </article>
        </div>
      ))}
    </div>
  )
}
