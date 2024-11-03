module.exports = {
  env: {
    node: true,
  },
  root: true,
  ignorePatterns: ["node_modules/", "build/", "dist/"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};
