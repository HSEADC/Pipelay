import importPlugin from "eslint-plugin-import";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist", "storybook-static"]),
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["*.config.*", ".storybook/**/*"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      eslintConfigPrettier,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: process.cwd(),
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "import/no-unresolved": "off",
      "import/named": "off",
      "import/namespace": "off",

      "no-console": "warn",
      "no-unused-expressions": "off",
      "no-constant-condition": "error",
      "no-unreachable": "error",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
        },
      ],
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-confusing-non-null-assertion": "error",
      "@typescript-eslint/no-duplicate-type-constituents": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/consistent-indexed-object-style": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
        },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "variable",
          format: ["UPPER_CASE", "camelCase", "PascalCase"],
          modifiers: ["global", "exported"],
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          modifiers: ["unused"],
          leadingUnderscore: "require",
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
        {
          selector: "class",
          format: ["PascalCase"],
        },
        {
          selector: ["enum", "enumMember"],
          format: ["UPPER_CASE"],
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: ["method", "property"],
          format: ["camelCase", "PascalCase", "snake_case"],
        },
        {
          selector: ["memberLike", "classProperty"],
          modifiers: ["private"],
          format: ["camelCase"],
          leadingUnderscore: "require",
        },
        {
          selector: "parameter",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "import",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
        },
      ],

      "import/order": [
        "warn",
        {
          "newlines-between": "always",

          alphabetize: {
            order: "asc",
          },

          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "type",
          ],

          pathGroups: [
            {
              pattern: "@app/*",
              position: "before",
              group: "internal",
            },
            {
              pattern: "@pages/*",
              position: "before",
              group: "internal",
            },
            {
              pattern: "@widgets/*",
              position: "before",
              group: "internal",
            },
            {
              pattern: "@features/*",
              position: "before",
              group: "internal",
            },
            {
              pattern: "@entities/*",
              position: "before",
              group: "internal",
            },
            {
              pattern: "@shared/*",
              position: "before",
              group: "internal",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.stories.{ts,tsx}", "**/*.test.{ts,tsx}"],
    rules: {
      "no-console": "off",
    },
  },
]);
