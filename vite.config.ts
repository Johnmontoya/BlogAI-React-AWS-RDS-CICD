import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    allowedHosts: [
      "lb-blog-app-aws-cicd-1040057830.us-east-1.elb.amazonaws.com", // <-- ¡Añadido!
    ],
  },
});
