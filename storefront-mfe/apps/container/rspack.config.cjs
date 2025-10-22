// apps/container/rspack.config.cjs
const path = require("path");
const { ModuleFederationPlugin } = require("@module-federation/rspack");

module.exports = {
  context: __dirname,
  entry: "./src/main.tsx",
  mode: "development",
  output: {
    publicPath: "http://localhost:3000/",
    clean: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        products: "products@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: false },
        "react-dom": { singleton: true, eager: true, requiredVersion: false },
      },
      // prevent noisy websockets/runtime plugins — same as products
      dts: false,
      runtimePlugins: [],
    }),
  ],
  devServer: {
    port: 3000,
    static: { directory: path.join(__dirname, "public") },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: { syntax: "typescript", tsx: true },
            transform: { react: { runtime: "automatic" } },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
