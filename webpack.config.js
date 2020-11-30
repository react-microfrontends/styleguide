const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-mf",
    projectName: "styleguide",
    webpackConfigEnv,
  });

  const cssRule = defaultConfig.module.rules.find((rule) => {
    return (
      Array.isArray(rule.use) &&
      rule.use.some(
        (use) =>
          (typeof use === "string" && use.includes("style-loader")) ||
          (use.loader && use.loader.includes("style-loader"))
      )
    );
  });
  cssRule.use.push({
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  });

  return webpackMerge.smart(defaultConfig, {
    devServer: {
      client: {
        port: 9001,
      },
    },
  });
};
