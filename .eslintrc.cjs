module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    ignorePatterns: ['docs', '.eslintrc.cjs'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: '18.2',
        },
    },
    rules: {
        'max-len': [
            'warn',
            {
                code: 120,
            },
        ],
        quotes: ['warn', 'single', 'avoid-escape'],
    },
};
