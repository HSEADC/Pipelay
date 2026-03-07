const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "docs"),
      watch: true,
    },
    hot: true,
    open: true,
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(".", "docs"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer"),
                  require("postcss-preset-env"),
                  require(path.resolve(__dirname, "../plugins/hovermedia.cjs")),
                ],
              },
            },
          },
        ],
      },
    ],
  },
});
