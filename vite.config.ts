import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    viteMockServe({
      mockPath: 'mock',
      ignore: /^_/,
      watchFiles: true,
      enable: true,
      logger: true,
      cors: true
  })
  ]
})
