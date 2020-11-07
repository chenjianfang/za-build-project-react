const eslintrc = {
    extends: [
        'airbnb',
        'plugin:react/recommended',
        'plugin:import/typescript'
    ],
    env: {
        browser: true,
        es6: true,
    },
    settings: {
        react: {
            version: '17.0.0',
        },
    },
    parser: '@typescript-eslint/parser',
    plugins: ['react', 'babel', '@typescript-eslint', 'react-hooks'],
    // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
            },
        },
    ],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        camelcase: 0,
        'react/jsx-one-expression-per-line': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-indent': 0,
        'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'site/**',
                    'tests/**',
                    'scripts/**',
                    '**/*.test.js',
                    '**/__tests__/*',
                    '*.config.js',
                    '**/*.md',
                ],
            },
        ],
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-has-content': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'comma-dangle': 0,
        'react/jsx-filename-extension': 0,
        'react/state-in-constructor': 0,
        'react/jsx-props-no-spreading': 0,
        'prefer-destructuring': 0, // TODO: remove later
        'consistent-return': 0, // TODO: remove later
        'no-return-assign': 0, // TODO: remove later
        'no-param-reassign': 0, // TODO: remove later
        'react/destructuring-assignment': 0, // TODO: remove later
        'react/no-did-update-set-state': 0, // TODO: remove later
        'react/require-default-props': 0,
        'react/default-props-match-prop-types': 0,
        'import/no-cycle': 'error',
        'react/no-find-dom-node': 0,
        'no-underscore-dangle': 0,
        'react/sort-comp': 0,
        // label-has-for has been deprecated
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-for.md
        'jsx-a11y/label-has-for': 0,
        // for (let i = 0; i < len; i++)
        'no-plusplus': 0,
        // https://eslint.org/docs/rules/no-continue
        // labeledLoop is conflicted with `eslint . --fix`
        'no-continue': 0,
        'react/display-name': 0,
        // ban this for Number.isNaN needs polyfill
        'no-restricted-globals': 0,
        'max-classes-per-file': 0,
        'react/static-property-placement': 0,
        'jest/no-test-callback': 0,
        'jest/expect-expect': 0,
        'react/prefer-stateless-function': 0,
        'import/prefer-default-export': 0,
        'import/no-unresolved': 0,
        'react/jsx-indent-props': 0,
        indent: 0,
        'no-tabs': 0,
        'react/no-array-index-key': 0,
        'linebreak-style': 0,
        'max-len': 0,
        'react/self-closing-comp': 0,
        'react/no-access-state-in-setstate': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'no-mixed-spaces-and-tabs': 0
    },
    globals: {
        gtag: true,
    },
};

module.exports = eslintrc;
