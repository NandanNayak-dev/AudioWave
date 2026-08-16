import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import macrosPlugin from 'vite-plugin-babel-macros'

// https://vitejs.dev/config/
dotenv.config()
export default defineConfig({
  server: {
    proxy: {
      '/api/local-sync': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/api/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://sparklines-backend.vercel.app',
        changeOrigin: true,
        secure: false,
        headers: {
          Origin: 'https://sparklines.vercel.app',
          Referer: 'https://sparklines.vercel.app/'
        },
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react(), macrosPlugin()],
  define: {
    'process.env': process.env,
  },
})
