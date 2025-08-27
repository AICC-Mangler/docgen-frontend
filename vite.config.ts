import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(
  {
  plugins: [react()],
  server: {
    port: 8181,
    proxy: {
      '/api': {
        // target: 'http://localhost:3100',
        target: 'http://192.168.10.220:3100',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})