import React from 'react'
import { useLocation } from 'react-router-dom'

const defaultProducts = [
  { id: 1, name: 'HTML & CSS - Jon Duckett', image: '/assets/img/books/html-css-duckett.jpg' },
  { id: 2, name: 'Front-End - Curso Completo', image: '/assets/img/books/front-end-curso.jpg' },
  { id: 3, name: 'JavaScript & jQuery - Jon Duckett', image: '/assets/img/books/js-jquery-duckett.jpg' },
  { id: 4, name: 'Fundamentos de Desenvolvimento Web Back-end', image: '/assets/img/books/fundamentos-back-end.jpg' },
  { id: 5, name: 'Desenvolvimento Back End: Oportunidade', image: '/assets/img/books/desenvolvimento-back-end.jpg' },
  { id: 6, name: 'Programação Web com Node.js', image: '/assets/img/books/nodejs-programacao-web.jpg' },
  { id: 7, name: 'JavaScript (Andy Vickler)', image: '/assets/img/books/javascript-3in1.jpg' },
  { id: 8, name: 'Full-Stack com ASP.NET Core', image: '/assets/img/books/fullstack-aspnetcore.jpg' },
  { id: 9, name: 'JavaScript from Frontend to Backend', image: '/assets/img/books/javascript-frontend-backend.jpg' },
  { id: 10, name: 'React - Aprenda Praticando', image: '/assets/img/books/react-aprenda-praticando.jpg' },
]

export default function ProductList({ products = defaultProducts }) {
  const { search } = useLocation()
  const q = new URLSearchParams(search).get('q')?.toLowerCase() || ''
  const filtered = q
    ? products.filter(p => p.name.toLowerCase().includes(q))
    : products

  return (
    <div className="row">
      {filtered.map(p => (
        <div className="col-1-5 col-12-mobile" key={p.id}>
          <article className="item">
            <div className="image fit">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                onError={(e) => {
                  const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 450'><rect width='100%' height='100%' fill='#1f2937'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#e5e7eb' font-family='Arial, sans-serif' font-size='24'>Capa</text></svg>`)
                  e.currentTarget.src = `data:image/svg+xml;utf8,${svg}`
                }}
              />
            </div>
          </article>
        </div>
      ))}
    </div>
  )
}
