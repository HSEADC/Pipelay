const HtmlWebpackPlugin = require("html-webpack-plugin");

function createPages(template, outputPath, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: `${outputPath}/index.html`,
    chunks: [...chunks, "vendors"],
  });
}

const htmlWebpackPlugins = [
  createPages("./src/index.html", ".", ["index"]),
  createPages("./src/pages/ArticlesPage/index.html", "articles", ["articles"]),
];

module.exports = htmlWebpackPlugins;
