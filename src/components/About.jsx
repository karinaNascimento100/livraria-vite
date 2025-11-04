import React from 'react'
import { Link } from 'react-router-dom'

export default function About({
  title = 'Sobre Nós: Conectando Mundos através da Tecnologia e da Leitura',
  intro = 'Bem-vindo à nossa livraria! Mais do que uma simples loja de livros, este é um projeto nascido da intersecção entre duas grandes paixões: a literatura, que expande nossos horizontes, e a tecnologia, que constrói o futuro.',
  paragraphs = [
    'Eu sou Karina Loria Meira Nascimento, um estudante do 4º semestre de Ciência de Dados e Inteligência Artificial. Este espaço digital foi criado como parte da minha jornada acadêmica na matéria de FullStack do Senai Cimatec.',
    'O objetivo era claro: criar mais do que um e-commerce. A meta era desenvolver uma experiência fluida e inteligente, onde cada clique, cada busca e cada item no carrinho de compras funcionasse de maneira harmoniosa.',
    'Acredito que, assim como um bom livro, um código bem escrito tem o poder de criar novos mundos e possibilidades. Esta livraria é a minha forma de compartilhar essa visão com você.',
    'Obrigado por fazer parte desta história. Explore, descubra e boa leitura!',
  ],
  items = [],
  heroImage = '',
  heroAlt = '',
  includeHeading = false,
  backTo = '/',
}) {
  return (
    <div className="about-card max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
      {heroImage ? (
        <img
          className="w-full max-h-48 object-cover rounded-b-xl"
          src={heroImage}
          alt={heroAlt || title}
          loading="lazy"
        />
      ) : null}

      <div className="p-6 sm:p-8">
        {includeHeading && (
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
        )}

        <div className="prose prose-slate max-w-none">
          {intro && <p className="text-gray-700 leading-relaxed text-justify">{intro}</p>}
          {paragraphs.map((p, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed text-justify">{p}</p>
          ))}
          {items && items.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mt-6">Nossos procedimentos</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                {items.map((li, idx) => (
                  <li key={idx}>{li}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="mt-6">
          <Link to={backTo} className="button">
            &larr; Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
