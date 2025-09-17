import { fixupPluginRules } from "@eslint/compat";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
 
const stylisticConfig = stylistic.configs.customize({
  semi: true,
  quotes: "single",
  jsxSingleQuote: true,
  tabWidth: ["error", 2],
  useTabs: ["error", false],
  commaDangle: "always-multiline",
  braceStyle: "1tbs",
});
 
export default [
  {
    files: ["**/*.{ts,tsx,js}"],
    ignores: [
      "**/*.config.*",
      "**/*.d.ts",
      "**/dist/**",
      "**/node_modules/**",
      "**/public/**",
      ".next/**",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "coverage/**",
      "jest.config.js",
      "jest.setup.js",
    ],
    // fixupPluginRules is needed for plugins to work with new API of ESLint 9xx
    plugins: {
      "@typescript-eslint": fixupPluginRules(tseslint),
      "react-hooks": fixupPluginRules(pluginReactHooks),
      react: fixupPluginRules(pluginReact),
      "@stylistic": fixupPluginRules(stylistic),
      import: fixupPluginRules(pluginImport),
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
       // project: ["./tsconfig.json"],
      },
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...stylisticConfig.rules,
      "max-len": ["error", { code: 120 }],
      "no-console": ["warn", { allow: ["error"] }],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "eol-last": ["error", "always"],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-max-props-per-line": ["error", { maximum: 1 }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { caughtErrors: "none", args: "after-used" },
      ],
      "padding-line-between-statements": [
        "error",
 
        // Add blank line before return
        { blankLine: "always", prev: "*", next: "return" },
 
        // After variable declarations
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "always", prev: "*", next: ["const", "let", "var"] },
        {
          blankLine: "never",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
 
        // After block statements
        { blankLine: "always", prev: "if", next: "*" },
        { blankLine: "always", prev: "block-like", next: "*" },
 
        // After import statements
        {
          blankLine: "always",
          prev: "import",
          next: [
            "const",
            "let",
            "var",
            "function",
            "class",
            "export",
            "return",
          ],
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal", "parent"],
            ["sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],
      "prefer-const": "error",
    },
  },
];
