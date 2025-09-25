import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Cart() {
  const cart = useSelector(s => s.cart)
  const dispatch = useDispatch()

  const remove = id => dispatch({ type: 'REMOVE_FROM_CART', payload: { id } })
  const dec = id => dispatch({ type: 'DECREMENT_QTY', payload: { id } })
  const toBRL = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
  const total = cart.reduce((acc, i) => acc + i.price * (i.qty || 1), 0)

  if (!cart.length)
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Carrinho</h2>
        <p className="text-gray-600 mb-6">Seu carrinho está vazio.</p>
        <Link
          to="/products"
          className="inline-block bg-primaryGreen text-white px-5 py-2 rounded-md font-medium hover:bg-green-600 transition"
        >
          Continuar comprando
        </Link>
      </div>
    )

  // Agrupar por vendedor (seller) para separação opcional
  // Layout em lista: imagem à esquerda, descrição à direita
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <Link
          to="/products"
          className="bg-primaryGreen text-white px-5 py-2 rounded-md font-medium hover:bg-green-600 transition"
        >
          Continuar comprando
        </Link>
        <button
          className="bg-red-100 text-red-700 px-5 py-2 rounded-md font-medium hover:bg-red-200 transition"
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
        >
          Esvaziar carrinho
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y">
        {cart.map(item => (
          <article
            key={item.id}
            className="grid md:grid-cols-[110px_1fr_auto] grid-cols-[90px_1fr] gap-4 p-4"
          >
            <div className="w-[90px] md:w-[110px] h-[120px] md:h-[140px] overflow-hidden rounded bg-gray-50 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name || 'Livro'}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-snug">{item.name || 'Livro'}</h3>
              <div className="flex flex-wrap gap-2 text-[11px] text-gray-600">
                {item.condition && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{item.condition}</span>}
                {item.year && <span className="px-2 py-0.5 bg-gray-100 rounded-full">Ano: {item.year}</span>}
                {item.language && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{item.language}</span>}
                {item.weight && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{item.weight}</span>}
                {item.isbn && <span className="px-2 py-0.5 bg-gray-100 rounded-full">ISBN {item.isbn}</span>}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700">Qtd:</span>
                <button
                  className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => dec(item.id)}
                  aria-label="Diminuir quantidade"
                >-</button>
                <span className="min-w-[2ch] text-center font-semibold">{item.qty || 1}</span>
                <button
                  className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
                  aria-label="Aumentar quantidade"
                >+</button>
                <button
                  className="ml-2 text-xs text-red-600 hover:underline"
                  onClick={() => remove(item.id)}
                >Remover</button>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xs uppercase tracking-wide text-gray-500">Total</span>
                <span className="font-bold text-primaryGreen text-sm md:text-base">{toBRL(item.price * (item.qty || 1))}</span>
              </div>
            </div>
            {/* Coluna de preço removida; valor agora dentro do bloco principal */}
          </article>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <div className="text-right">
          <div className="text-sm uppercase tracking-wide text-gray-500">Total</div>
          <div className="text-2xl font-bold text-primaryGreen">{toBRL(total)}</div>
        </div>
      </div>
    </div>
  )
}
