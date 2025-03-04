import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Porta de desenvolvimento
  },
  build: {
    outDir: "dist", // Diretório de saída
  },
  base: "/", // 🔹 GARANTE QUE O FRONTEND FUNCIONE NO RENDER
});
