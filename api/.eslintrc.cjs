module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [],
  "rules": {
    "space-before-function-paren": 2, //强制在function关键字后使用空格
    "eqeqeq": ["error", "always"], //强制使用===和!==
    "no-eval": "error", //禁止使用eval()
    "comma-dangle": ["error", "never"], //末尾不要有逗号
    "jsx-quotes": ["error", "prefer-single"], //jsx中使用单引号
    "quotes": ["error", "single"], //使用单引号
    "indent": ["error", "tab"], //tab缩进为2个空格
    "semi": ["error", "never"], // 禁止末尾有分号
    "object-curly-spacing": ["error", "always"] //要求大括号内有空格
  }
}
