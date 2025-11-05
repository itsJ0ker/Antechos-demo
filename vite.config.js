import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react'
            if (id.includes('recharts')) return 'charts'
            if (id.includes('@headlessui') || id.includes('@heroicons')) return 'ui'
            // add more rules here if needed
          }
        }
      }
    },
    // Raise the warning limit (optional)
    chunkSizeWarningLimit: 1000
  }
})
