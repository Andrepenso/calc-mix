import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite o acesso externo ao servidor dev
  },
  preview: {
    port: 4173, // Define uma porta para preview
    allowedHosts: ["calc-mix-frontend.onrender.com"], 
  },
});
