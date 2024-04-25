import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      "/api/search": {
        target: "https://api.iconbolt.com/search",
        changeOrigin: true,
        secure: false,
      },
      "/test": {
        target: "https://www.iconbolt.com/api",
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
  },
})
