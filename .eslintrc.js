module.exports = {
    "extends": [
        "airbnb",
        "plugin:react/recommended"
    ],
    'parser': 'babel-eslint',
    'env': {
        'jest': true
    },
    'plugins': [
        "react"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    }
};