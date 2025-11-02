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
  const subtotal = total
  const shipping = 0

  const steps = [
    { label: 'Sacola', icon: '🛍️', status: 'current' },
    { label: 'Entrega', icon: '🚚', status: 'upcoming' },
    { label: 'Pagamento', icon: '💳', status: 'upcoming' },
    { label: 'Revisão', icon: '🧾', status: 'upcoming' },
  ]

  if (!cart.length)
    return (
      <div className="max-w-4xl mx-auto cart-wrapper px-8 pb-12 pt-24 mt-12">
        <div className="flex flex-col items-center text-center gap-4 py-10">
          <div className="h-28 w-28 rounded-full bg-amber-100 grid place-items-center text-4xl">
            📦
          </div>
          <h2 className="text-2xl font-semibold text-slate-800">Sua sacola está vazia!</h2>
          <p className="text-slate-600 max-w-md">
            Que tal dar uma olhadinha nas ofertas de hoje? Tem muita coisa incrível te esperando!
          </p>
          <Link
            to="/products"
            className="button"
          >
            Conferir produtos
          </Link>
        </div>
      </div>
    )
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-10 flex flex-col gap-10">
        <div className="flex items-center justify-between gap-4 overflow-x-auto rounded-2xl bg-white/80 px-6 py-4 shadow-sm">
          {steps.map((step, idx) => (
            <React.Fragment key={step.label}>
              <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                <div
                  className={`h-11 w-11 rounded-full border-2 grid place-items-center text-lg ${
                    step.status === 'current'
                      ? 'border-blue-500 text-blue-500 bg-blue-50'
                      : 'border-slate-200 text-slate-400 bg-white'
                  }`}
                  aria-current={step.status === 'current'}
                >
                  <span role="img" aria-label={step.label}>{step.icon}</span>
                </div>
                <span className={`${step.status === 'current' ? 'text-blue-600 font-semibold' : 'text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-px bg-slate-200 hidden sm:block" aria-hidden />
              )}
            </React.Fragment>
          ))}
        </div>

  <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-4">
          {cart.map(item => (
            <article
              key={item.id}
              className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6 flex flex-col gap-6"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center justify-center h-28 w-28 rounded-xl bg-slate-100 shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name || 'Livro'}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 max-w-[22rem] leading-snug">
                      {item.name || 'Livro'}
                    </h3>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">Preço unidade</div>
                      <div className="text-lg font-semibold text-slate-900">{toBRL(item.price)}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                    {item.condition && <span className="px-2 py-1 bg-slate-100 rounded-full">{item.condition}</span>}
                    {item.year && <span className="px-2 py-1 bg-slate-100 rounded-full">Ano: {item.year}</span>}
                    {item.language && <span className="px-2 py-1 bg-slate-100 rounded-full">{item.language}</span>}
                    {item.weight && <span className="px-2 py-1 bg-slate-100 rounded-full">{item.weight}</span>}
                    {item.isbn && <span className="px-2 py-1 bg-slate-100 rounded-full">ISBN {item.isbn}</span>}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">Quantidade</span>
                      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 bg-white">
                        <button
                          type="button"
                          className="text-lg leading-none text-slate-600 hover:text-slate-900"
                          onClick={() => dec(item.id)}
                          aria-label="Diminuir quantidade"
                        >
                          –
                        </button>
                        <span className="min-w-[2ch] text-center font-semibold text-slate-900">
                          {item.qty || 1}
                        </span>
                        <button
                          type="button"
                          className="text-lg leading-none text-slate-600 hover:text-slate-900"
                          onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="text-sm text-slate-500 underline underline-offset-4 hover:text-slate-700"
                      onClick={() => remove(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-4">
                <div className="text-sm text-slate-500">Total do item</div>
                <div className="text-xl font-semibold text-emerald-700">
                  {toBRL(item.price * (item.qty || 1))}
                </div>
              </div>
            </article>
          ))}

          <div className="flex flex-wrap gap-3 justify-between">
            <button
              type="button"
              className="button"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
            >
              Esvaziar carrinho
            </button>
            <Link to="/products" className="button">
              Continuar comprando
            </Link>
          </div>
        </section>

          <aside className="flex flex-col gap-6">
            <section className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-6 space-y-5">
            <div>
                <h2 className="text-base font-semibold text-slate-900">Resumo</h2>
                <p className="text-sm text-slate-500">Confira os valores antes de seguir para as próximas etapas.</p>
            </div>

            <div className="rounded-xl bg-emerald-100/70 border border-emerald-200 px-4 py-3 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                <span role="img" aria-hidden>🎟️</span>
                Tem um código de cupom?
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Insira aqui"
                  aria-label="Código do cupom"
                />
                <button type="button" className="button">
                  Inserir
                </button>
              </div>
            </div>

            <dl className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <dt>Produtos ({cart.length})</dt>
                <dd>{toBRL(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                  <dt>Frete</dt>
                  <dd>{shipping === 0 ? 'A combinar na entrega' : toBRL(shipping)}</dd>
              </div>
              <div className="flex justify-between font-semibold text-slate-900 text-base">
                <dt>Total</dt>
                <dd>{toBRL(subtotal + shipping)}</dd>
              </div>
            </dl>

            <button
              type="button"
              className="w-full rounded-xl bg-green-600 text-white text-base font-semibold py-3 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Continuar
            </button>
          </section>

          </aside>
        </div>
      </div>
    </div>
  )
}
