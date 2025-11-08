import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
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
    minify: 'esbuild',
    // Для GitHub Pages, если приложение размещается в подпапке
    outDir: 'dist',
    assetsDir: 'assets'
  },
  // Если приложение размещается не в корне (например, username.github.io/repo-name)
  base: './', // или process.env.NODE_ENV === 'production' ? '/repo-name/' : './'
  css: {
    postcss: './postcss.config.js'
  }
})