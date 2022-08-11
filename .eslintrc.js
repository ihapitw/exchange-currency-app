module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    semi: [2, 'never'],
    quotes: [2, 'single', { avoidEscape: true }],
    'no-trailing-spaces': 'error',
    'no-multiple-empty-lines': 'error',
    'no-unreachable': ['error'],
    'no-unused-labels': 'error',
    'no-fallthrough': 'error',
    'default-case': 'error',
    'consistent-return': 'error',
    'comma-dangle': 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'space-before-function-paren': ['off'],
    'no-useless-constructor': ['off'],
    'no-console': ['warn', { allow: ['warn', 'error', 'info', 'group', 'groupEnd'] }],

    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/space-before-function-paren': ['error'],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],

    'vue/no-v-html': ['off'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/block-lang': ['error',
      {
        script: {
          lang: 'ts',
        },
      },
    ],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false,
      ignores: [],
    }],
    'vue/no-useless-v-bind': ['error', {
      ignoreIncludesComment: false,
      ignoreStringEscape: false,
    }],
    'vue/no-multiple-objects-in-class': 'error',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
  },
}
