const Dotenv = require("dotenv-webpack");
const { resolve } = require("path");

module.exports = {
  plugins: [
    new Dotenv({
      path: resolve(__dirname, ".env"),
      safe: false,
    }),
  ],
};
