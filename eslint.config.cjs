const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const react = require("eslint-plugin-react");
const hooks = require("eslint-plugin-react-hooks");

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      ".expo",
      "pharmix-test/venv/**",
      "*.config.js",
      "eslint.config.cjs",
    ],
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      react,
      "react-hooks": hooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "@typescript-eslint/no-unused-vars": "warn",

      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },
];
