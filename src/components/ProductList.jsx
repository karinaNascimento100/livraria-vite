import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const defaultProducts = [
  {
    id: 1,
    name: 'HTML & CSS',
    image: 'https://leitura.com.br/image/cache/products/9788539648542-228x228.jpg',
    price: 35.0,
    seller: 'Sebo Abbondanza',
    isbn: '9788570015587',
    condition: 'usado',
    year: 1996,
    weight: '850g',
    language: 'Português',
  },
  { id: 2,  name: 'Primeiros Passos com React', image: 'https://leitura.com.br/image/cache/products/9788575225202-228x228.jpg', price: 99.9, seller: 'Livraria Online' },
  { id: 3,  name: 'Programação WEB com Node e Express', image: 'https://leitura.com.br/image/cache/products/9786586057089-228x228.jpg', price: 139.9, seller: 'Livraria Online' },
  { id: 4,  name: 'Programação em HTML5', image: 'https://leitura.com.br/image/cache/products/9788576088455-228x228.jpg', price: 89.9, seller: 'Livraria Online' },
  { id: 5,  name: 'Programação Profissional em HTML5', image: 'https://leitura.com.br/image/cache/products/9788576087441-228x228.jpg', price: 79.9, seller: 'Livraria Online' },
  { id: 6,  name: 'Logica de Programação e Estrutura de Dados', image: 'https://leitura.com.br/image/cache/products/9788543019147-228x228.jpg', price: 119.9, seller: 'Livraria Online' },
  { id: 7,  name: 'Logica de Programação e Algoritmos com Javascript', image: 'https://leitura.com.br/image/cache/products/9788575226568-228x228.jpg', price: 109.9, seller: 'Livraria Online' },
  { id: 8,  name: 'Introdução a Programação', image: 'https://leitura.com.br/image/cache/products/9788535210194-228x228.jpg', price: 149.9, seller: 'Livraria Online' },
  { id: 9,  name: 'Fundamentos de Programação', image: 'https://leitura.com.br/image/cache/products/9788586804960-228x228.jpg', price: 94.9, seller: 'Livraria Online' },
  { id: 10, name: 'React Aprenda Praticando', image: 'https://leitura.com.br/image/cache/products/9786586057393-228x228.jpg', price: 89.9, seller: 'Livraria Online' },
]

export default function ProductList({ products = defaultProducts, pageSize = 3, autoplayMs = 4500 }) {
  const dispatch = useDispatch()
  const { search } = useLocation()
  const q = new URLSearchParams(search).get('q')?.toLowerCase() || ''
  const filtered = q
    ? products.filter(p =>
        ((p.name || '').toLowerCase().includes(q)) || ((p.seller || '').toLowerCase().includes(q))
      )
    : products

  const addToCart = (p) => {
    // Garantia de preço numérico (fallback 0)
    const priceSafe = typeof p.price === 'number' ? p.price : 0
    dispatch({ type: 'ADD_TO_CART', payload: { ...p, price: priceSafe } })
  }

  const formatBRL = (n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n || 0)

  // cria um preço "de" para exibir a economia (aprox. 20-35% off)
  const makeCompareAt = (price) => {
    if (typeof price !== 'number' || !isFinite(price)) return null
    const factor = 1 + 0.2 + (Math.abs(((price * 1000) % 1500)) / 10000) // ~20% a ~35%
    return Math.round(price * factor * 100) / 100
  }

  // Paginação em carrossel (3 por página por padrão)
  const pages = useMemo(() => {
    if (!Array.isArray(filtered) || filtered.length === 0) return []
    const out = []
    for (let i = 0; i < filtered.length; i += pageSize) {
      out.push(filtered.slice(i, i + pageSize))
    }
    return out
  }, [filtered, pageSize])

  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  // Garante índice válido quando o filtro muda
  useEffect(() => {
    if (page >= pages.length) setPage(0)
  }, [pages.length, page])

  const canSlide = pages.length > 1
  const nextPage = useCallback(() => {
    if (!canSlide) return
    setPage((p) => (p + 1) % pages.length)
  }, [canSlide, pages.length])
  const prevPage = useCallback(() => {
    if (!canSlide) return
    setPage((p) => (p - 1 + pages.length) % pages.length)
  }, [canSlide, pages.length])

  // Autoplay com pausa ao passar o mouse
  useEffect(() => {
    if (!canSlide || paused) return
    const id = setInterval(nextPage, Math.max(2000, autoplayMs || 4500))
    return () => clearInterval(id)
  }, [canSlide, paused, nextPage, autoplayMs])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {pages.length === 0 ? (
        <div className="text-center py-10 text-slate-500">Nenhum produto encontrado</div>
      ) : (
        <>
          {/* Track do carrossel */}
          <div className="overflow-hidden" id="product-carousel">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {pages.map((group, gi) => (
                <div key={gi} className="w-full shrink-0 px-4 sm:px-6 lg:px-8 xl:px-10 py-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:[grid-template-columns:repeat(3,minmax(19rem,1fr))] gap-5">
                    {group.map((p, idx) => {
                      const price = typeof p.price === 'number' ? p.price : 0
                      const compareAt = makeCompareAt(price)
                      const discount = compareAt ? Math.max(0, Math.round(100 - (price / compareAt) * 100)) : 0
                      // índice absoluto para badge de ranking
                      const absoluteIndex = gi * pageSize + idx
                      return (
                        <article
                          key={p.id}
                          className="group relative bg-white rounded-2xl shadow ring-1 ring-black/5 overflow-hidden flex flex-col hover:shadow-lg transition"
                        >
                          {/* badge de ranking */}
                          <div className="absolute -left-3 -top-3 h-12 w-12 rounded-full bg-slate-100 text-slate-900 font-bold grid place-items-center shadow">
                            {absoluteIndex + 1}
                          </div>

                          {/* badge de desconto */}
                          {discount > 0 && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-2 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                              {discount}% off
                            </div>
                          )}

                          {/* imagem da capa */}
                          <div className="p-5 pb-3 grid place-items-center">
                            <img
                              src={p.image}
                              alt={p.name || 'Livro'}
                              className="h-56 w-56 object-contain select-none"
                              loading="lazy"
                              onError={(e) => {
                                const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect width='100%' height='100%' fill='#1f2937'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#e5e7eb' font-family='Arial, sans-serif' font-size='22'>Capa</text></svg>`)
                                e.currentTarget.src = `data:image/svg+xml;utf8,${svg}`
                              }}
                            />
                          </div>

                          {/* título */}
                          <h3 className="px-5 mt-2 text-slate-900 font-medium leading-snug line-clamp-3 min-h-[3.6em]">
                            {p.name}
                          </h3>

                          {/* preços */}
                          <div className="px-5 mt-3 mb-1 flex items-baseline gap-3">
                            {compareAt && (
                              <span className="text-slate-400 text-sm line-through">{formatBRL(compareAt)}</span>
                            )}
                            <span className="text-emerald-700 font-semibold text-lg">{formatBRL(price)}</span>
                          </div>

                          {/* vendedor */}
                          <div className="px-5 text-xs text-slate-500 mb-3">
                            Vendido e entregue por
                            <div className="text-slate-800">{p.seller || 'leitura.com'}</div>
                          </div>

                          {/* ações */}
                          <div className="px-5 pb-5 mt-auto flex items-center gap-2">
                              <button
                                type="button"
                                className="button w-full flex items-center justify-center gap-2 text-base"
                                aria-label={`Adicionar ${(p.name || 'livro')} ao carrinho`}
                                onClick={() => addToCart(p)}
                              >
                                <span aria-hidden>🛒</span>
                                Comprar
                              </button>
                            <button
                              type="button"
                              className="ml-1 inline-flex items-center justify-center rounded-full border border-slate-300 text-slate-600 hover:text-slate-800 hover:border-slate-400 h-11 w-11 p-0 text-xl bg-stone-200/70 hover:bg-stone-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                              title="Favoritar"
                              aria-label="Favoritar"
                            >
                              ♥
                            </button>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controles */}
          {canSlide && (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-12 w-12 rounded-full bg-slate-800 text-white shadow-lg hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 text-2xl select-none"
                aria-label="Anterior"
                aria-controls="product-carousel"
                onClick={prevPage}
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-12 w-12 rounded-full bg-slate-800 text-white shadow-lg hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 text-2xl select-none"
                aria-label="Próximo"
                aria-controls="product-carousel"
                onClick={nextPage}
              >
                ›
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}
