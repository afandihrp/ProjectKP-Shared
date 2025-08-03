import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    https: false,
    allowedHosts: ['localhost','thing-fountain.gl.at.ply.gg', '127.0.0.1'],
    // proxy: {
    //   '/': {
    //     target: 'environment-relief.gl.at.ply.gg:24588',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
})
