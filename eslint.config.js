import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  tseslint.configs.base,
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/array-type": "error",
    },
  },
  {
    rules: {
      "@typescript-eslint/array-type": "off",
    },
  },
);
