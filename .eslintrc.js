module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "plugin:vue/essential", "eslint:recommended", "@vue/prettier"
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'prettier/prettier': ['off'],
    'nuxt/no-cjs-in-config': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'never'
        }
      }
    ],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-use-v-if-with-v-for': [2],
    'arrow-parens': ['warn', 'as-needed'],
    'no-unused-vars': 'warn',
    'vue/v-on-function-call': ['error'],
    skipBlankLines: 0,
    ignoreComments: 0
  }
}
