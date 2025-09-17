import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/kar-gallery/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Vite + Node で普通に使える書き方
    },
  },
})
