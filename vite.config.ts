import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Change this to your repository name for GitHub Pages, e.g., '/your-repo-name/'
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['gray-matter']
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  }
})
