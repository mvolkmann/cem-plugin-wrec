import wrecPlugin from "./index.js";

export default {
  exclude: ["node_modules"],
  //dev: true, // for extra logging
  globs: ["fixtures/**/*.js"],
  plugins: [wrecPlugin()],
};
