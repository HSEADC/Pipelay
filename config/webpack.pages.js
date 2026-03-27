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
  createPages("./src/pages/ArticlePage/index.html", "article", ["articlePage"]),
  createPages("./src/pages/TestsPage/index.html", "tests", ["testsPage"]),
  createPages("./src/pages/TestPage/index.html", "test", ["testPage"]),
  createPages("./src/pages/AboutPage/index.html", "about", ["aboutPage"]),
];

module.exports = htmlWebpackPlugins;
