const javascriptRules = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-react", "@babel/preset-env"],
    }
  }
};

module.exports = {
  entry: "./index.js",
  output: {
    filename: "app.js",
  },
  module: {
    rules: [javascriptRules],
  },
};
