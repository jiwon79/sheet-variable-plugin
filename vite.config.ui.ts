import { defineConfig } from "vite";

import { viteSingleFile } from "vite-plugin-singlefile";

import postcssUrl from "postcss-url";
import { relative, resolve } from "path";

export default defineConfig({
  plugins: [viteSingleFile()],
  root: resolve(__dirname, "./src/ui/"),
  build: {
    outDir: resolve(__dirname, "./dist"),
    rollupOptions: {
      input: {
        ui: relative(__dirname, "./src/ui/index.html"),
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
      "@ui": resolve(__dirname, "./src/ui"),
    },
  },
});
