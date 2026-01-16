import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173,      // Explicitly sets the port to 5173
    strictPort: true // Prevents Vite from automatically switching to 5175 if 5173 is busy
  },
})