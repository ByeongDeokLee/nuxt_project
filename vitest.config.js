import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "pinia"],
      dirs: ["./composables/"],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    include: [path.resolve(__dirname, "**", "*.spec.ts")],
    coverage: {
      provider: "v8",
      reporter: "html",
      reportsDirectory: "./coverage",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
