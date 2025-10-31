import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  /*preview: {
    port: 5173,
    strictPort: true,
  },*/
  server: {
    port: 8000,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: [
      "lb-blog-app-aws-cicd-1040057830.us-east-1.elb.amazonaws.com", // <-- ¡Añadido!
    ],
  },
});
