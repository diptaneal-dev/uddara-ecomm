import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    cors: {
      origin: [
        'http://localhost:8091',
        'http://www.uddara.com:8091',
        'http://admin.uddara.com:5173',
        'http://whouse.uddara.com:5173',
        // Add more as needed
      ],
      credentials: true,
    },
    allowedHosts: [
      'admin.uddara.com',
      'www.uddara.com',
      'whouse.uddara.com',
      // Add other dev domains here
    ],
  },
});
