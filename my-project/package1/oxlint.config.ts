import baseConfig from "../oxlint.config.ts";
import { defineConfig } from "oxlint";
export default defineConfig({
  extends: [baseConfig],
  rules: {
    "no-console": "off",
  },
});
