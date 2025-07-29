import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import path from "path"; // <-- Add this

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      // Use absolute path instead of relative string
      sassVariables: path.resolve(__dirname, "src/quasar-variables.sass"),
    }),
  ],
});
