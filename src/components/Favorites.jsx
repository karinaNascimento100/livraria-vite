import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { announce } from './LiveAnnouncer'

/*
  Favorites
  - Componente responsável por listar os itens favoritados pelo usuário.
  - Permite remover favoritos e mover um favorito para o carrinho (ação MOVE_FAVORITE_TO_CART).
  - Observação: os dados de `favorites` vêm diretamente da store (localStorage é usado para persistência).
*/

export default function Favorites() {
  const favorites = useSelector(s => s.favorites || [])
  const dispatch = useDispatch()

  const remove = id => dispatch({ type: 'REMOVE_FAVORITE', payload: { id } })
  const moveToCart = (item) => {
    dispatch({ type: 'MOVE_FAVORITE_TO_CART', payload: { id: item.id } })
    try {
      announce(`${item.name || 'Item'} transferido para a sacola`)
    } catch { /* noop */ }
  }

  // Formatação de valores e cálculo simples de preço 'compareAt' para exibir economia
  const toBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
  const makeCompareAt = (price) => {
    if (typeof price !== 'number' || !isFinite(price)) return null
    const discounts = [10, 15, 20, 35]
    const idx = Math.floor(price) % discounts.length
    const pct = discounts[idx]
    const compareAt = price / (1 - pct / 100)
    return Math.round(compareAt * 100) / 100
  }

  // Estado vazio: instruções rápidas para o usuário sobre como favoritar itens
  if (!favorites.length) return (
    <div className="max-w-4xl mx-auto px-8 pb-12 pt-24 mt-12">
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-8 text-center">
        <div
          className="h-28 w-28 rounded-full bg-pink-100 grid place-items-center text-4xl mx-auto"
          role="img"
          aria-label="Favoritos — vazio"
          title="Favoritos — vazio"
        >
          💖
        </div>
        <h2 className="text-2xl font-semibold text-slate-800 mt-4">Você não tem favoritos ainda</h2>
        <p className="text-slate-600 max-w-md mx-auto">Adicione livros que você goste e volte aqui para transferi-los ao carrinho quando quiser comprar.</p>
        <Link to="/products" className="button mt-4 inline-block">Ver produtos</Link>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Seus favoritos</h2>
      <div className="grid gap-6">
        {favorites.map(item => {
          const compareAt = makeCompareAt(item.price)
          const discount = compareAt ? Math.max(0, Math.round(100 - (item.price / compareAt) * 100)) : 0
          return (
            <article key={item.id} className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-4 flex items-center gap-4">
              <div className="h-28 w-28 bg-slate-100 rounded overflow-hidden flex items-center justify-center">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                    <div className="text-sm text-slate-500">{item.seller}</div>
                  </div>
                  <div className="text-right">
                    {compareAt && <div className="text-sm text-slate-400 line-through">{toBRL(compareAt)}</div>}
                    <div className="font-semibold text-emerald-700 text-lg">{toBRL(item.price)}</div>
                    {discount > 0 && <div className="text-sm text-sky-600">{discount}% off</div>}
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="button"
                    onClick={() => moveToCart(item)}
                    title={`Transferir ${item.name} para a sacola`}
                    aria-label={`Transferir ${item.name || 'item'} para a sacola`}
                  >
                    Adicionar à sacola
                  </button>
                  <button
                    type="button"
                    className="text-sm text-slate-500 underline hover:text-slate-700"
                    onClick={() => remove(item.id)}
                    title={`Remover ${item.name} dos favoritos`}
                    aria-label={`Remover ${item.name || 'item'} dos favoritos`}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
