import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Vercel serves from the root; GitHub Pages from /portfolio/
  base: process.env.VERCEL ? '/' : '/portfolio/',
  plugins: [react()],
})
