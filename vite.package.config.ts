import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  server: {
    port: 5174,
  },
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
    emptyOutDir: false,
    lib: {
      entry: fileURLToPath(new URL("./src/panels/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [/^(lit|lit\/.*)$/, /^@ztolley\/wombat-sdk(?:\/.*)?$/],
    },
    target: ["chrome114", "firefox115"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
