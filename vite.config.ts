import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages serves the app from /<repo>/, so the deploy workflow sets
  // BASE_PATH. Everywhere else (dev, Vercel) it is served from the root.
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
