// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     allowedHosts: ['6bb0af0082c4.ngrok-free.app'],
//   },
// })

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://6bb0af0082c4.ngrok-free.app',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
      }
    },
    allowedHosts: ['6bb0af0082c4.ngrok-free.app'], // Add this if you see "Blocked request" error
  },
})
