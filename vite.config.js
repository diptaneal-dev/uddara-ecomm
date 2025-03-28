import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: {
      origin: ['http://localhost:8091', 'http://www.uddara.com:8091'],
      credentials: true,
    },
    allowedHosts: ['www.uddara.com'], // 👈 ADD THIS
  },
})
