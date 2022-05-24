const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const NodePolyFillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {},
    },
    plugins: [
      require("unplugin-vue-components/webpack")({
        /* options */
        resolvers: [VantResolver()],
      }),
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
    ],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        return {
          ...options,
          reactivityTransform: true,
        };
      });
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/css/variables.scss";`,
      },
    },
  },
});
