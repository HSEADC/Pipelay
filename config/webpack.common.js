const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const htmlWebpackPlugins = require("./webpack.pages");
const htmlWebpackPartialsPlugins = require("./webpack.partials");

const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.ts",
    articles: "./src/pages/ArticlesPage/index.ts",
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@shared": path.resolve(__dirname, "../src/shared"),
      "@entities": path.resolve(__dirname, "../src/entities"),
      "@pages": path.resolve(__dirname, "../src/pages"),
      "@features": path.resolve(__dirname, "../src/features"),
      "@widgets": path.resolve(__dirname, "../src/widgets"),
    },
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(".", "docs"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            plugins: ["@babel/plugin-transform-class-properties"],
            cacheDirectory: true,
          },
        },
      },
      {
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        test: /\.(svg|gif|webp)/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    ...htmlWebpackPlugins,
    // ...htmlWebpackPartialsPlugins,
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/images",
          to: "images",
          noErrorOnMissing: true,
        },
      ],
    }),
    // new FaviconsWebpackPlugin({
    //   logo: "./src/images/favicon.png",
    //   cache: true,
    //   mode: "webapp",
    // }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
