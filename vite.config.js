import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        // Separa el motor 3D del código de la app: mejor caché y arranque.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          const isSceneLib =
            /node_modules[\\/](three|three-stdlib|@react-three|@use-gesture|maath|troika|camera-controls|meshline)[\\/]/.test(
              id,
            )
          return isSceneLib ? 'scene' : undefined
        },
      },
    },
  },
})
