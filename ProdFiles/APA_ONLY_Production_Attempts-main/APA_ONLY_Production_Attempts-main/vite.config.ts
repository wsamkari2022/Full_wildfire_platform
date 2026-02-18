import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/VRDS_APA/',
  server: {
    port: 3003,
    proxy: {
      '/VRDS_APA/api': {
        target: 'http://localhost:4003',
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
