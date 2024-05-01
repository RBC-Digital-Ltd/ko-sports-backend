/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: [
    "@typescript-eslint",
    "no-use-extend-native",
    "unicorn",
    "import",
    "n",
    "eslint-comments",
  ],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],

  parser: "@typescript-eslint/parser",

  rules: {
    "no-use-extend-native/no-use-extend-native": "error",

    "unicorn/filename-case": [
      "error",
      {
        case: "camelCase",
      },
    ],

    "import/default": "error",
    "import/export": "error",
    "import/extensions": "off",

    "import/first": "error",

    "import/named": "error",

    "import/namespace": [
      "error",
      {
        allowComputed: true,
      },
    ],
    "import/no-absolute-path": "error",
    "import/no-anonymous-default-export": "error",
    "import/no-named-default": "error",
    "import/no-webpack-loader-syntax": "error",
    "import/no-self-import": "error",
    "import/no-cycle": [
      "error",
      {
        ignoreExternal: true,
      },
    ],
    "import/no-useless-path-segments": "error",
    "import/newline-after-import": [
      "error",
      {
        // TODO: Buggy.
        // considerComments: true,
      },
    ],
    "import/no-amd": "error",
    "import/no-duplicates": [
      "error",
      {
        "prefer-inline": true,
      },
    ],

    // We use `unicorn/prefer-module` instead.
    // 'import/no-commonjs': 'error',

    // Looks useful, but too unstable at the moment
    // 'import/no-deprecated': 'error',

    "import/no-empty-named-blocks": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        includeTypes: true,
      },
    ],
    "import/no-mutable-exports": "error",
    "import/no-named-as-default-member": "error",
    "import/no-named-as-default": "error",

    // Disabled because it's buggy and it also doesn't work with TypeScript
    // 'import/no-unresolved': [
    // 	'error',
    // 	{
    // 		commonjs: false
    // 	}
    // ],

    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        "newlines-between": "never",
        warnOnUnassignedImports: true,
      },
    ],
    "import/no-unassigned-import": [
      "error",
      {
        allow: [
          "@babel/polyfill",
          "**/register",
          "**/register.*",
          "**/register/**",
          "**/register/**.*",
          "**/*.css",
          "**/*.scss",
          "**/*.sass",
          "**/*.less",
        ],
      },
    ],

    // Redundant with `import/no-extraneous-dependencies`.
    // 'n/no-extraneous-import': 'error',
    // 'n/no-extraneous-require': 'error',

    // Redundant with `import/no-unresolved`.
    // 'n/no-missing-import': 'error', // This rule is also buggy and doesn't support `node:`.
    // 'n/no-missing-require': 'error',

    "n/no-unpublished-bin": "error",

    // We have this enabled in addition to `import/extensions` as this one has an auto-fix.
    "n/file-extension-in-import": [
      "off",
      "always",
      {
        // TypeScript doesn't yet support using extensions and fails with error TS2691.
        ".ts": "never",
        ".tsx": "never",
        ".mts": "never",
        ".cts": "never",
      },
    ],
    "n/no-mixed-requires": [
      "error",
      {
        grouping: true,
        allowCall: true,
      },
    ],
    "n/no-new-require": "error",
    "n/no-path-concat": "error",

    // Disabled because they're too annoying, see:
    // https://github.com/mysticatea/eslint-plugin-node/issues/105
    // 'n/no-unpublished-import': [
    // 	'error',
    // 	{
    // 		allowModules: [
    // 			'electron',
    // 			'atom'
    // 		]
    // 	}
    // ],
    // 'n/no-unpublished-require': [
    // 	'error',
    // 	{
    // 		allowModules: [
    // 			'electron',
    // 			'atom'
    // 		]
    // 	}
    // ],

    "n/process-exit-as-throw": "error",

    // Disabled as the rule doesn't exclude scripts executed with `node` but not referenced in 'bin'. See https://github.com/mysticatea/eslint-plugin-node/issues/96
    // 'n/shebang': 'error',

    "n/no-deprecated-api": "error",
    "n/prefer-global/buffer": ["error", "never"],
    "n/prefer-global/console": ["error", "always"],
    "n/prefer-global/process": ["error", "never"],
    "n/prefer-global/text-decoder": ["error", "always"],
    "n/prefer-global/text-encoder": ["error", "always"],
    "n/prefer-global/url-search-params": ["error", "always"],
    "n/prefer-global/url": ["error", "always"],
    "n/prefer-promises/dns": "error",
    "n/prefer-promises/fs": "error",

    "eslint-comments/disable-enable-pair": [
      "error",
      {
        allowWholeFile: true,
      },
    ],
    "eslint-comments/no-aggregating-enable": "error",
    "eslint-comments/no-duplicate-disable": "error",

    // Disabled as it's already covered by the `unicorn/no-abusive-eslint-disable` rule.
    // 'eslint-comments/no-unlimited-disable': 'error',

    "eslint-comments/no-unused-disable": "error",
    "eslint-comments/no-unused-enable": "error",
  },

  overrides: [
    // TS
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],

      files: ["./**/*.{ts}"],

      rules: {
        "import/named": "off",
      },

      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },

    // Node
    {
      files: [".eslintrc.cjs", "esbuild-plugin.cjs"],
      env: {
        node: true,
      },
    },
  ],
};
