/*
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-06-26 12:17:59
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-07-30 10:47:35
 * @FilePath: \rk-demo-vue2\src\mocker\index.js
 * @Version: 1.0.0
 */
const delay = require('mocker-api/lib/delay');
const { login } = require('./user');

// 是否禁用MOCK代理
const noProxy = process.env.VUE_APP_NO_PROXY === 'true';

const proxy = {
  'POST /api/userinfo/:id': (req, res) => {
    console.log('-1--->', req.params);
    return res.json({
      id: '111',
      username: 'kenny',
      sex: 6
    });
  },
  'POST /api/login/account': login,
  'DELETE /api/user/:id': (req, res) => {
    console.log('--2-->', req.body);
    console.log('--3-->', req.params.id);
    res.send({ status: 'ok', message: '删除成功！' });
  }
};
module.exports = noProxy ? {} : delay(proxy, 1000);
