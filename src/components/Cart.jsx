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

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <Link
          to="/products"
          className="bg-primaryGreen text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition"
        >
          Continuar comprando
        </Link>
        <button
          className="bg-red-100 text-red-700 px-4 py-2 rounded-md font-medium hover:bg-red-200 transition"
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
        >
          Esvaziar carrinho
        </button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y">
        {cart.map(item => (
          <article
            key={item.id}
            className="grid grid-cols-[90px_1fr_auto] gap-4 p-4 last:rounded-b-lg first:rounded-t-lg"
          >
            <div className="w-[90px] h-[120px] overflow-hidden rounded bg-gray-50 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name || 'Livro'}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-500">Vendido por {item.seller || 'Livraria Online'}</div>
              <h3 className="text-lg font-semibold text-gray-800 leading-snug">{item.name || 'Livro'}</h3>
              {item.isbn && <div className="text-xs text-gray-500">ISBN: {item.isbn}</div>}
              <div className="flex flex-wrap gap-3 text-[11px] text-gray-600">
                {item.condition && <span className="px-2 py-0.5 bg-gray-100 rounded-full">{item.condition}</span>}
                {item.year && <span className="px-2 py-0.5 bg-gray-100 rounded-full">Ano: {item.year}</span>}
                {item.weight && <span className="px-2 py-0.5 bg-gray-100 rounded-full">Peso: {item.weight}</span>}
                {item.language && <span className="px-2 py-0.5 bg-gray-100 rounded-full">Idioma: {item.language}</span>}
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700">Qtd:</span>
                <button
                  className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => dec(item.id)}
                >-</button>
                <span className="min-w-[2ch] text-center font-semibold">{item.qty || 1}</span>
                <button
                  className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
                >+</button>
                <button
                  className="ml-2 text-xs text-red-600 hover:underline"
                  onClick={() => remove(item.id)}
                >Remover</button>
                {item.seller && (
                  <Link
                    to={`/products?q=${encodeURIComponent(item.seller)}`}
                    className="ml-auto text-xs text-primaryGreen hover:underline"
                  >
                    + livros do vendedor
                  </Link>
                )}
              </div>
            </div>
            <div className="text-right font-bold text-gray-800 min-w-[90px]">{toBRL(item.price * (item.qty || 1))}</div>
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
