import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@axi-engine/utils': path.resolve(__dirname, '../../packages/utils/src'),
      '@axi-engine/fields': path.resolve(__dirname, '../../packages/fields/src'),
      '@axi-engine/states': path.resolve(__dirname, '../../packages/states/src'),
    },
  },

  // Hot Module Replacement (HMR).
  server: {
    watch: {
      paths: ['../../packages/**'],
    }
  },

  // exclude packages catching
  optimizeDeps: {
    exclude: [
      '@axi-engine/utils',
      '@axi-engine/fields',
      '@axi-engine/states'
    ],
  }
})
