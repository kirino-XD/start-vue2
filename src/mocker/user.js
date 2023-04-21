/*
 * @Author: your name
 * @objectDescription: ROPEOK
 * @Date: 2022-06-26 12:17:59
 * @LastEditors: shuangyu zou
 * @LastEditTime: 2022-07-30 10:47:37
 * @FilePath: \rk-demo-vue2\src\mocker\user.js
 * @Version: 1.0.0
 */
exports.login = function (req, res) {
  const { password, username } = req.body;
  if (password === '888888' && username === 'admin') {
    return res.json({
      status: 'ok',
      code: 0,
      token: 'sdfsdfsdfdsf',
      data: {
        id: 1,
        username: 'kenny',
        sex: 6
      }
    });
  } else {
    return res.json({
      status: 'error',
      code: 403
    });
  }
};
