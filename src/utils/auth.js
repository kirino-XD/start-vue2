/*
 * @Author: your name
 * @objectDescription: 科右前旗社区党群服务平台
 * @Date: 2022-07-17 16:01:34
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-07-31 11:06:47
 * @FilePath: \new-common\src\utils\auth.js
 * @Version: 1.0.0
 */
import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

const ExpiresInKey = 'Admin-Expires-In';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1;
}

export function setExpiresIn(time) {
  return Cookies.set(ExpiresInKey, time);
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey);
}
