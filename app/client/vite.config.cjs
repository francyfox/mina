import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'app') }
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
  },
  css: {
    devSourcemap: true,
    transformer: 'lightningcss',
    postcss: {
      plugins: [
        require('postcss-import'),
        require('autoprefixer'),
        require('postcss-nested'),
      ]
    }
  }
})
