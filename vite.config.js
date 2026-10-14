import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://varshith192.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
