module.exports = {
  parser: "vue-eslint-parser",
  extends: ["plugin:vue/vue3-essential"],
  rules: {
    // override/add rules settings here, such as:
    "vue/no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
    "vue/valid-template-root": "off",
    "vue/no-setup-props-destructure": "off",
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
};
