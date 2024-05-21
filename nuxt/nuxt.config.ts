// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    '@': fileURLToPath(new URL('./app', import.meta.url)),
  },
  postcss: {
    plugins: {
      'postcss-import': true,
      'autoprefixer': true,
      'postcss-nested': true,
    },
  }
})
