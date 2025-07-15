import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/3210/',
  server: {
    allowedHosts: ['call-copied.gl.at.ply.gg', 'thing-fountain.gl.at.ply.gg'],
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
    preview: {
    // also whitelist for the preview server
    allowedHosts: ['call-copied.gl.at.ply.gg', 'thing-fountain.gl.at.ply.gg'],
  },

})
