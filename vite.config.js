import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url'

// Configuração do Vite — documentação: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // When using `vite preview` for quick checks, bind it to the same one-port origin
  // so we don't introduce multi-port confusion during audits.
  preview: {
    host: '127.0.0.1',
    port: 8080,
    strictPort: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    globals: true,
  },
  // Exemplos comentados de configuração opcional
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
  // test: {
  //   environment: 'jsdom',
  //   setupFiles: ['./src/setupTests.js'],
  // },
})
