const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");
const path = require("path");

function createPartialsPlugin(partialPath, location, options = {}) {
  return new HtmlWebpackPartialsPlugin([
    {
      path: path.join(__dirname, partialPath),
      location,
      template_filename: "*",
      priority: "replace",
      options,
    },
  ]);
}

const htmlWebpackPartialsPlugins = [
  createPartialsPlugin(
    "../src/shared/ui/molecules/M_SearchInput/M_SearchInput.html",
    "M_SearchInput",
  ),
  createPartialsPlugin(
    "../src/shared/ui/molecules/M_Header/M_Header.html",
    "M_Header",
  ),
  createPartialsPlugin(
    "../src/shared/ui/organisms/O_Sidebar/O_Sidebar.html",
    "O_Sidebar",
  ),
  createPartialsPlugin(
    "../src/shared/ui/wrappers/W_MobileNav/W_MobileNav.html",
    "W_MobileNav",
  ),
  createPartialsPlugin(
    "../src/shared/ui/molecules/M_Footer/M_Footer.html",
    "M_Footer",
  ),
];

module.exports = htmlWebpackPartialsPlugins;
