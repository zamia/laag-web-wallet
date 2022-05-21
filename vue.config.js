const { defineConfig } = require("@vue/cli-service");
const NodePolyFillPlugin = require("node-polyfill-webpack-plugin");
const path = require("path");
const { VantResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require("unplugin-auto-import/webpack")({
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
        /* options */
      }),

      new NodePolyFillPlugin(),

      require("unplugin-vue-components/webpack")({
        /* options */
        resolvers: [VantResolver()],
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/css/variables.scss";`,
      },
    },
  },
});
