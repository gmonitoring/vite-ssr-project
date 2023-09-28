import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dynamicImport from "vite-plugin-dynamic-import";
import path from "path";

export default defineConfig({
  plugins: [react(), dynamicImport()],
  // build: {
  //   minify: false,
  // },
  base: "./",
  resolve: {
    alias: {
      src: path.join(__dirname, "./src"),
      db: path.join(__dirname, "./db"),
      public: path.join(__dirname, "./public"),
      dist: path.join(__dirname, "./dist"),
    },
  },
});
