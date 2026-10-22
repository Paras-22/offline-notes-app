import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Paras: Here I did the Vite configuration for my Offline Notes App.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Paras: Files in "public" (service-worker.js, manifest.json) are copied to the build as they are
  publicDir: 'public',

  // Paras: Port for "npm run dev"
  server: {
    port: 5173,
  },

  // Paras: Port for "npm run preview" (I test the offline mode here after building)
  preview: {
    port: 4173,
  },

  // Paras: Build output goes to the "dist" folder
  build: {
    outDir: 'dist',
  },
})
