import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: 'localhost',
        port: 3000,
    },
    build: {
        outDir: 'build',
        assetsDir: '.',
        chunkSizeWarningLimit: 1000, // Set your desired limit in kilobytes
        rollupOptions: {
          output: {
            manualChunks(id) {
              // Return the name of the chunk for the given module
              if (id.includes('node_modules')) {
                return 'vendor';
              }
            },
          },
        },
    },
    resolve: {
        alias: {
          '@': '/src',
        },
      },
})
