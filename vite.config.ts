import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';

import { resolve } from 'path';
import { readFileSync } from 'fs';

const additionalData = readFileSync(resolve(__dirname, './src/var.scss'), 'utf-8');

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  envDir: resolve(__dirname, './config/env'),
  envPrefix: 'AX__',
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      { find: '$', replacement: resolve(__dirname, './src/utils/$') }
    ]
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData
      }
    }
  }
})
