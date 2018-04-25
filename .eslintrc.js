module.exports = {
  extends: ['plugin:vue/recommended', 'prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ["**/*.ts", "**/*.vue"],
      parserOptions: {
        parser: "typescript-eslint-parser",
      },
      rules: {
        'prettier/prettier': 'error',
      },
    },
    {
      files: ["**/*.js"],
      parserOptions: {
        parser: "esprima",
      },
      rules: {
        'prettier/prettier': 'error',
      },
    }
  ]
};
