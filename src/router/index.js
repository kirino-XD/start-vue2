/*
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-06-17 11:11:57
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-08-07 16:56:19
 * @FilePath: \rk-demo-vue2\src\router\index.js
 * @Version: 1.0.0
 */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 公共路由
export const constantRoutes = [
  {
    path: '/order',
    component: (resolve) => require(['@/views/Order'], resolve),
    isHidden: true
  },
  {
    path: '/index',
    component: (resolve) => require(['@/views/Index'], resolve),
    isHidden: true
  },
  {
    path: '/hmap',
    component: (resolve) => require(['@/views/hmap/mapIndex/hmap.vue'], resolve),
    isHidden: false
  },
  {
    path: '/testVmodel',
    component: (resolve) => require(['@/views/test.vue'], resolve),
    isHidden: false
  },
  {
    path: '/testmce',
    component: (resolve) => require(['@/views/testmce.vue'], resolve),
    isHidden: false
  },
];
if(process.env.NODE_ENV === 'production') {
  constantRoutes.push({ path: '/', redirect: '/testVmodelFather' });
}else{
  constantRoutes.push({ path: '/', redirect: '/order' });// 开发环境"/"重定向到路由列表页
}
export default new Router({
  mode: 'hash', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});
