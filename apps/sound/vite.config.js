import {defineConfig} from 'vite'
import path from 'path';


export default defineConfig({
  resolve: {
    alias: {
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
      '@axi-engine/utils'
    ],
  }
})
