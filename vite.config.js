import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), {
    name: 'remove-crossorigin',
    transformIndexHtml(html) {
      return html.replaceAll('crossorigin ', '')
    }
  }, cloudflare()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        landing: resolve(__dirname, 'public/landing.html'),
      }
    }
  },
})