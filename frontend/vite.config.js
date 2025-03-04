import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração para suportar o Render corretamente
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta para desenvolvimento local
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
