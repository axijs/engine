import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@axi-engine/fields': path.resolve(__dirname, '../../packages/fields/src'),
      '@axi-engine/states': path.resolve(__dirname, '../../packages/states/src'),
      '@axi-engine/tasks': path.resolve(__dirname, '../../packages/tasks/src'),
      '@axi-engine/tasks-anime': path.resolve(__dirname, '../../packages/tasks-anime/src'),
      '@axi-engine/utils': path.resolve(__dirname, '../../packages/utils/src'),
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
      '@axi-engine/fields',
      '@axi-engine/states',
      '@axi-engine/tasks',
      '@axi-engine/tasks-anime',
      '@axi-engine/utils'
    ],
  }
})
