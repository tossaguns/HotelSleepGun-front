import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  optimizeDeps: {
    include: ["@primeuix/themes/aura"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
