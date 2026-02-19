import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@axi-engine/data': path.resolve(__dirname, '../../packages/data/src'),
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
      '@axi-engine/data',
      '@axi-engine/states',
      '@axi-engine/tasks',
      '@axi-engine/tasks-anime',
      '@axi-engine/utils'
    ],
  }
})
