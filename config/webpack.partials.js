const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");
const path = require("path");

function createPartialsPlugin(partialPath, location) {
  return new HtmlWebpackPartialsPlugin([
    {
      path: path.join(__dirname, partialPath),
      location: location,
      template_filename: "*",
      priority: "replace",
    },
  ]);
}

const htmlWebpackPartialsPlugins = [
  createPartialsPlugin("../src/partials/partial/partial.html", "partial"),
];

module.exports = htmlWebpackPartialsPlugins;
