import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginImportX from "eslint-plugin-import-x";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import nodePlugin from "eslint-plugin-n";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    rules: {
      "import-x/default": "error",
      "import-x/export": "error",
      "import-x/extensions": "off",

      "import-x/first": "error",

      "import-x/named": "error",

      "import-x/namespace": [
        "error",
        {
          allowComputed: true,
        },
      ],
      "import-x/no-absolute-path": "error",
      "import-x/no-anonymous-default-export": "error",
      "import-x/no-named-default": "error",
      "import-x/no-webpack-loader-syntax": "error",
      "import-x/no-self-import": "error",
      "import-x/no-cycle": [
        "error",
        {
          ignoreExternal: true,
        },
      ],
      "import-x/no-useless-path-segments": "error",
      "import-x/newline-after-import": [
        "error",
        {
          // TODO: Buggy.
          // considerComments: true,
        },
      ],
      "import-x/no-amd": "error",
      "import-x/no-duplicates": [
        "error",
        {
          "prefer-inline": true,
        },
      ],

      // We use `unicorn/prefer-module` instead.
      // 'import-x/no-commonjs': 'error',

      // Looks useful, but too unstable at the moment
      // 'import-x/no-deprecated': 'error',

      "import-x/no-empty-named-blocks": "error",
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          includeTypes: true,
        },
      ],
      "import-x/no-mutable-exports": "error",
      "import-x/no-named-as-default-member": "error",
      "import-x/no-named-as-default": "error",

      // Disabled because it's buggy and it also doesn't work with TypeScript
      // 'import-x/no-unresolved': [
      // 	'error',
      // 	{
      // 		commonjs: false
      // 	}
      // ],

      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "parent", "sibling", "index"],
          "newlines-between": "never",
          warnOnUnassignedImports: true,
        },
      ],
      "import-x/no-unassigned-import": [
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
    },
  },
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ignores: ["eslint.config.mjs"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "off",
      "import-x/no-dynamic-require": "warn",
      "import-x/no-nodejs-modules": "off",
    },
  },
  eslintPluginUnicorn.configs["flat/recommended"],
  {
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          case: "camelCase",
        },
      ],
    },
  },
  {
    plugins: { n: nodePlugin },
    rules: {
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
    },
  },
  {
    files: ["eslint.config.mjs"],
    rules: {
      "import-x/no-named-as-default-member": "off",
    },
  },
  eslintConfigPrettier,
);
