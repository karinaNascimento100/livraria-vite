// Tailwind CSS v4: usar o pacote '@tailwindcss/postcss' ao invés de 'tailwindcss' direto
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
}
