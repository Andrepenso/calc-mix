import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // 🔹 Mantém a base correta para evitar erro 404
  build: {
    outDir: "dist", // 🔹 Garante que o build seja feito corretamente
  },
});
