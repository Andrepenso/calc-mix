import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuração para corrigir o problema de "Not Found" no Render
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta local
  },
  build: {
    outDir: 'dist',
  },
  base: '/', // Define a base para evitar problemas de rota
});
