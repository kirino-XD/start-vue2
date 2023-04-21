/*
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-07-11 17:16:26
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-08-07 16:35:17
 * @FilePath: \rk-demo-vue2\src\utils\rem.js
 * @Version: 1.0.0
 */

const baseSize = 16;
setRem();
function setRem() {
  const scale = document.documentElement.clientWidth / 1920;
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + 'px';
}
window.onresize = function () {
  setRem();
};
