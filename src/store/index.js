/*
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-07-08 15:56:52
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-07-30 10:45:29
 * @FilePath: \rk-demo-vue2\src\store\index.js
 * @Version: 1.0.0
 */
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user
  },
  getters
});

export default store;
