import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  base: "/", // 🔹 Corrige o erro "Not Found" ao atualizar a página
  build: {
    outDir: "dist", // 🔹 Define a pasta de saída do build
  }
});
