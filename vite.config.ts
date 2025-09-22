import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: "eslint . --ext .ts,.tsx",
        useFlatConfig: true,
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    target: ["chrome138"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5174,
  },
});
