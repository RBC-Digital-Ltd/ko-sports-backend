/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */

module.exports = {
  root: true,
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },

  overrides: [
    // Node
    {
      files: [".eslintrc.cjs", "esbuild-plugin.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
