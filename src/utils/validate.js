/*
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-06-17 21:37:33
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-06-17 21:37:50
 * @FilePath: \ropeok-demo\src\utils\validate.js
 * @Version: 1.0.0
 */
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
