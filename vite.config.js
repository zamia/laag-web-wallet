import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  define: {},
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        /* options */
        "vue",
        "vue-router",
        "pinia",
      ],
    }),
    Components({
      /* options */
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      stream: "stream-browserify",
    },
  },
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/css/main.scss";`,
      },
    },
  },
  optimizeDeps: {},
});
