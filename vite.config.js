import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.config.js/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.lottie'], // <-- ADD THIS LINE
})