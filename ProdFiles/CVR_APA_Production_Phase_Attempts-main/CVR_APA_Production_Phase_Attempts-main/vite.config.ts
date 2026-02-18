import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Base path for deployment at moonlander.fit.edu/VRDS_CVR_APA
  base: '/VRDS_CVR_APA/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // Set to true if you need source maps for debugging
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/VRDS_CVR_APA/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
      },
    },
  },
});
