import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Increase timeout for large files
    timeout: 30000,
    // Enable CORS for video files
    cors: true,
  },
  assetsInclude: ['**/*.mp4'],
  build: {
    // Increase chunk size limit for video files
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate video chunks
          video: ['/background-vidz/1.mp4', '/background-vidz/2.mp4', '/background-vidz/3.mp4', '/background-vidz/4.mp4', '/background-vidz/5.mp4', '/background-vidz/6.mp4']
        }
      }
    }
  }
})
