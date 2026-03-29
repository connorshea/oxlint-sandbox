import babelPlugin from "@babel/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  {
    plugins: {
      "@babel": babelPlugin,
    },
    rules: {
      // These rules are enabled here, but eslint-config-prettier turns them
      // off because they conflict with Prettier formatting.
      "@babel/object-curly-spacing": "error",
      "@babel/semi": "error",
    },
  },
  // eslint-config-prettier disables all formatting rules, including the
  // @babel rules above. After this config is applied, all @babel rules
  // are "off".
  eslintConfigPrettier,
];
