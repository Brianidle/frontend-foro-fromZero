const path = require("path");

const javascriptRules = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-react", "@babel/preset-env"],
    },
  },
};

const cssRules = { test: /\.css$/, use: ["style-loader", "css-loader"] };

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, ""),
    filename: "./dist/app.js",
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [javascriptRules, cssRules],
  },
};
