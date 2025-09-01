import tseslint from "typescript-eslint";

import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import globals from "globals";

import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";

import eslintReact from "@eslint-react/eslint-plugin";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      jsxA11y.flatConfigs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.recommended
    ],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser
    },
    rules: {
      // https://github.com/shadcn-ui/ui/issues/1534
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@eslint-react/no-context-provider": 0
    }
  },
  {
    plugins: {
      perfectionist
    },
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          internalPattern: ["^~/.+", "^@/.+"],
          sortSideEffects: false,
          groups: [
            "react",
            "typescript",
            "eslint",
            "eslint-plugin",
            "type-import",
            ["value-builtin", "value-external"],
            "type-internal",
            "value-internal",
            ["type-parent", "type-sibling", "type-index"],
            ["value-parent", "value-sibling", "value-index"],
            "ts-equals-import",
            "side-effect",
            "style",
            "side-effect-style",
            "unknown"
          ],
          customGroups: {
            value: {
              react: ["^react", "^react-dom"],
              typescript: ["^typescript"],
              eslint: ["^@eslint/.+", "^eslint/.+", "^globals"],
              "eslint-plugin": ["^eslint-plugin-.+"]
            }
          }
        }
      ]
    }
  },
  {
    plugins: {
      "unused-imports": unusedImports
    },
    rules: {
      "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ]
    }
  },
  eslintPluginPrettierRecommended
]);
