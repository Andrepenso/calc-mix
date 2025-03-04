import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 🔹 Garante que o Vite entenda o caminho correto no Render
export default defineConfig({
  plugins: [react()],
  base: "/", // 🔹 Define a base do projeto corretamente para evitar erros 404
  server: {
    port: 5173,
  },
});
