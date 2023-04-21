/*
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-06-19 14:50:11
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-06-19 20:13:55
 * @FilePath: \rk-demo-vue2\src\assets\icons\index.js
 * @Version: 1.0.0
 */
import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon'; // svg component

// register globally
Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
