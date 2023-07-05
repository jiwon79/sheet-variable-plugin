import { defineConfig } from "vite";
import path from "path";

import { viteSingleFile } from "vite-plugin-singlefile";

import postcssUrl from "postcss-url";
const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteSingleFile()],
  root: path.resolve(__dirname, "./src/ui/"),
  build: {
    outDir: path.resolve(__dirname, "./dist"),
    rollupOptions: {
      input: {
        ui: path.relative(__dirname, "./src/ui/index.html"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  css: {
    postcss: {
      plugins: [postcssUrl({ url: "inline" })],
    },
  },
  resolve: {
    alias: {
      "@ui": path.resolve(__dirname, "./src/ui"),
    },
  },
});