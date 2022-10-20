import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/to-do-list-vue/Jade/todo-Vuejs/dist/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/scss/base/_colors.scss";
        @import "@/assets/scss/base/_fonts.scss";
        @import "@/assets/scss/abstracts/_breakpoints.scss";
        @import "@/assets/scss/layout/_container.scss";
        @import "@/assets/scss/component/_display.scss";
        @import "@/assets/scss/component/_icon.scss";
        @import "@/assets/scss/component/_input.scss";
        `,
      },
    },
  },
});
