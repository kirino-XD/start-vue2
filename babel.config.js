/*
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-06-26 11:58:32
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-07-30 10:48:22
 * @FilePath: \rk-demo-vue2\babel.config.js
 * @Version: 1.0.0
 */
module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  env: {
    development: {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      plugins: ['dynamic-import-node']
    }
  }
};
