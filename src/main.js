/*
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-06-17 11:11:49
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-07-30 10:48:02
 * @FilePath: \rk-demo-vue2\src\main.js
 * @Version: 1.0.0
 */
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import _ from 'lodash'; // lodash
import '@/assets/icons'; // svg-icon
import '@/assets/styles/base.less'; // global css
import '@/utils/rem'; // rem自适应布局
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue2OrgTree from 'vue-tree-color';

/* 使用富文本组件 */
import Tinymce from '@/components/Tinymce/index.vue';
import Editor from '@/components/Editor';// 日志组件
Vue.component('Tinymce', Tinymce);
Vue.component('Editor', Editor);

// 全局方法挂载
Vue.prototype._ = _;
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(Element);
Vue.use(Vue2OrgTree);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
});
