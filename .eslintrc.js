module.exports = {
  root: true, // プロジェクトのルートに配置していると教えている
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "next",
    "plugin:@typescript-eslint/recommended", // 型チェックが不要なルールを適用
    "plugin:import/recommended",
    "plugin:import/typescript",
    "eslint:recommended", //ESLintのJavaScriptルールを適用
    "prettier",
  ],
  plugins: ["@typescript-eslint", "react", "import"], // TypeScriptプラグインのルールを適用
  parser: "@typescript-eslint/parser", // ESLintにTypeScriptを適応
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/no-namespace": 0, // namespaceを使ったほうが良い場面もあるのでoff
    "@typescript-eslint/no-unused-vars": [
      2,
      { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
    ],
    "import/no-unresolved": 0, // typescript等が判定してくれると思うのでoff
    "react-hooks/exhaustive-deps": 2,
    "import/order": [
      2,
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ["*.test.ts", "src/test-utils/**.ts"],
      env: {
        jest: true,
      },
      rules: {
        "@typescript-eslint/ban-ts-comment": 0,
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
