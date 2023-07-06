import { defineConfig } from "vite";
import { resolve } from "path";
import generateFile from "vite-plugin-generate-file";
import { viteSingleFile } from "vite-plugin-singlefile";
import figmaManifest from "./figma.manifest";

export default defineConfig({
  plugins: [
    viteSingleFile(),
    generateFile({
      type: "json",
      output: "./manifest.json",
      data: figmaManifest,
    }),
  ],
  build: {
    lib: {
      name: figmaManifest.name,
      entry: resolve(__dirname, "./src/plugin/plugin.ts"),
      fileName: "plugin",
      formats: ["es"],
    },
    emptyOutDir: false,
    outDir: resolve(__dirname, "./dist"),
  },
  resolve: {
    alias: {
      "@common": resolve(__dirname, "./src/common"),
      "@plugin": resolve(__dirname, "./src/plugin"),
    },
  },
});
