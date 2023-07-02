const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = (env) => {
  return {
    mode: env.NODE_ENV,
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    devServer: {
      static: path.join(__dirname, "./"),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: "/dist",
    },
    plugins: [new CleanWebpackPlugin()],
  };
};
