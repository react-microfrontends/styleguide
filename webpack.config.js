const webpackMerge = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: "react-mf",
    projectName: "styleguide",
    webpackConfigEnv
  });

  const rxjsExternals = {
    externals: [/^rxjs\/?.*$/]
  };

  return webpackMerge.smart(defaultConfig, rxjsExternals, {
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
                ident: "postcss",
                plugins: [require("tailwindcss"), require("autoprefixer")]
              }
            }
          ]
        }
      ]
    }
  });
};
