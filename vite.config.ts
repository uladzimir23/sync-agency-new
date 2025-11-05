import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3003,
    open: true
  },
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild'
  },
  // Добавьте эту секцию для Tailwind CSS 4
  css: {
    postcss: './postcss.config.js'
  }
})