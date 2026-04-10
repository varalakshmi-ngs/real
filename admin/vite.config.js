import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['admin.realtemple.com'],
    port: 80,
    host: true,
  },
})
