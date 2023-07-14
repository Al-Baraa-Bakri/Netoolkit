const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

const federationConfig = {
  name: "dashboard",
  filename: "remoteEntry.js",
  remotes: {
    ntk_ui: "ntk_ui@http://localhost:8080/remoteEntry.js",
  },
  exposes: {},
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};

module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:3000/",
  },

  infrastructureLogging: {
    level: "log",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
      test: /\.svg$/,
      use: 'svg-loader'
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin(federationConfig),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
