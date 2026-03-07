const postcss = require("postcss");

/** @type {import('postcss').PluginCreator<void>} */
const hoverMediaPlugin = () => {
  return {
    postcssPlugin: "postcss-hover-media",
    Once(root) {
      const hoverRules = [];
      const activeRules = [];

      root.walkRules((rule) => {
        if (
          rule.selector.includes(":hover") &&
          !(rule.parent && rule.parent.type === "atrule")
        ) {
          const hoverRule = rule.clone();
          hoverRule.raws = {
            before: "\n\t",
            between: " ",
            semicolon: true,
            after: "\n\t",
          };
          hoverRules.push(hoverRule);

          const activeRule = rule.clone();
          activeRule.selectors = activeRule.selectors.map((sel) =>
            sel.replace(/:hover/g, ":active")
          );
          activeRule.raws = {
            before: "\n\t",
            between: " ",
            semicolon: true,
            after: "\n\t",
          };
          activeRules.push(activeRule);

          rule.remove();
        }
      });

      if (hoverRules.length > 0) {
        const hoverMedia = postcss.atRule({
          name: "media",
          params: "(hover: hover) and (pointer: fine)",
          raws: {
            before: "\n",
            between: " ",
            after: "\n",
          },
        });

        hoverRules.forEach((rule) => {
          rule.walkDecls((decl) => {
            decl.raws = {
              before: "\n\t\t",
              between: ": ",
              important: " !important",
            };
          });
          hoverMedia.append(rule);
        });

        root.append(hoverMedia);
      }

      if (activeRules.length > 0) {
        const activeMedia = postcss.atRule({
          name: "media",
          params: "(hover: none) and (pointer: coarse)",
          raws: {
            before: "\n",
            between: " ",
            after: "\n",
          },
        });

        activeRules.forEach((rule) => {
          rule.walkDecls((decl) => {
            decl.raws = {
              before: "\n\t\t",
              between: ": ",
              important: " !important",
            };
          });
          activeMedia.append(rule);
        });

        root.append(activeMedia);
      }
    },
  };
};

hoverMediaPlugin.postcss = true;
module.exports = hoverMediaPlugin;
