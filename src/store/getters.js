/*
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-07-08 15:56:52
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-07-30 10:46:58
 * @FilePath: \rk-demo-vue2\src\store\getters.js
 * @Version: 1.0.0
 */
const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name
};
export default getters;
