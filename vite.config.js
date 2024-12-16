import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import process from 'process'
import dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.VITE_HOST || 'localhost',
    port: parseInt(process.env.VITE_PORT, 10) || 5173,
    https: process.env.VITE_PROTOCOL === 'https',
  },
})
