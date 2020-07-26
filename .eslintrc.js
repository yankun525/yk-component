// http://eslint.org/docs/user-guide/configuring
const OFF = 0;
const WARN = 1;
const ERROR = 2;
module.exports = {
    root: true,
    parser: 'babel-eslint',

    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint'
    },

    // required to lint *.vue files
    plugins: ['vue', 'html'],

    env: {
        browser: true,
        node: true
    },

    // add your custom rules here
    rules: {
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-redeclare': 2,
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4],
        semi: 0,
        'space-before-function-paren': 0,
        'no-unused-vars': 0,
        'one-var': 0,
        'no-tabs': 0,
        'no-new': 0,
        quotes: [1, 'single', {
            avoidEscape: true,
            allowTemplateLiterals: true
        }],
        'no-multiple-empty-lines': [2, { max: 2 }],
        'no-mixed-spaces-and-tabs': 0,
        'operator-linebreak': 0,
        'no-trailing-spaces': 0,
        'comma-spacing': 1,
        'space-before-blocks': 1,
        'func-call-spacing': 0,
        'linebreak-style': 0,
        'no-multi-spaces': [1, {
            exceptions: {
                Property: true,
                VariableDeclarator: true,
                ImportDeclaration: true,
                BinaryExpression: true
            }
        }]
    },

    extends: [
      'plugin:vue/essential',
      'standard',
      'eslint:recommended'
    ]
};
