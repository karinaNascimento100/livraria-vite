# Livraria Vite — Parada Obrigatória 2

Repositório base para a segunda Parada Obrigatória. Mantemos a estrutura do projeto da entrega anterior, mas o foco agora é **avaliar e aprimorar a acessibilidade** da aplicação conforme as etapas abaixo.

---

## Etapa 1 · Configuração inicial

1. **Instalação de dependências essenciais**

   ```powershell
   npm install redux react-redux react-router-dom
   ```

2. **Configuração do Redux (`src/store.js`)**

   ```js
   import { createStore } from 'redux'

   const initialState = { cart: [] }
# Livraria Vite — Parada Obrigatória 2

Este repositório é um projeto de exemplo (Vite + React) com um catálogo de livros, carrinho e favoritos.
As alterações recentes adicionam suporte a favoritos (persistidos em localStorage) e integração para mover um favorito ao carrinho.

O README abaixo foi escrito para qualquer pessoa (estudante / professor) clonar, executar e testar rapidamente o fluxo principal.

---

## Requisitos

- Node.js 16+ / npm
- Navegador moderno (Chrome/Edge/Firefox)

## Como clonar e executar

No PowerShell (Windows):

```powershell
git clone https://github.com/karinaNascimento100/livraria-vite.git
cd livraria-vite
npm install
# Build de produção e iniciar o servidor que serve os arquivos estáticos (dist/)
npm run build
npm start    # ou: npm run build && npm start
# abra http://127.0.0.1:8080
```

Observação: o Vite pode escolher uma porta alternativa se a padrão já estiver em uso — verifique a saída do terminal.

## Principais pontos do projeto

- `src/store.js` — Store Redux simples que gerencia `cart` e `favorites`.
- `src/components/ProductList.jsx` — Catálogo de produtos com botões para adicionar ao carrinho e favoritar.
- `src/components/Favorites.jsx` — Lista de favoritos; permite remover ou mover ao carrinho.
- `src/components/BannerCarousel.jsx` — Carrossel de banners exibido na home.
- `src/components/Header.jsx` — Mostra contadores dinâmicos para Carrinho e Favoritos.

## Testes rápidos (fluxo principal)

1. Abra a aplicação (`/products` ou `/`).
2. Clique no ícone de coração em um produto para favoritar.
3. Acesse `/favorites` (link no header) — o item deve aparecer.
4. Clique em "Adicionar à sacola" no favorito. O item será removido dos favoritos e aparecerá no carrinho (`/cart`).
5. Recarregue a página: itens no carrinho e favoritos devem persistir via localStorage.

## Notas técnicas para quem for avaliar

- A store usa um reducer central simples (switch/case) para manter o código didático.
- A persistência em `localStorage` grava apenas `cart` e `favorites` em um objeto `livraria_state`.
- Assets públicos são servidos a partir da pasta `public/` — referencie-os como `/assets/...`.

## Lint e testes

Comandos úteis:

```powershell
npm run lint    # se houver configuração de lint
npm test        # executa testes (se existirem)
```

## Boas práticas e sugestões

- Para produção, considere mover persistência para backend ou usar estratégia de sincronização autenticada.
- Adicionar toasts/confirmations melhora a usabilidade ao mover favoritos para o carrinho.
- Revisar acessibilidade: use leitores de tela e testes manuais para validar melhorias.

---

