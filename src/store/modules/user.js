import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { getConfigByType } from '@/api/system/config';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    expiresIn: null,
    userInfo: null
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_EXPIRES_IN: (state, time) => {
      state.expiresIn = time;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
    SET_USER_INFO: (state, user) => {
      state.userInfo = user;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            let data = res.data;
            setToken(data.access_token);
            commit('SET_TOKEN', data.access_token);
            // setExpiresIn(data.expiresIn)
            // commit('SET_EXPIRES_IN', data.expiresIn)
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取锁定时间
    GetLockTime({ commit }) {
      return new Promise((resolve, reject) => {
        getConfigByType({ configType: 'TIMEOUT_LOCK' })
          .then((res) => {
            const overTime = (JSON.parse(res.data.content) || {}).overTime;
            commit('SET_EXPIRES_IN', +overTime);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      console.log(state);
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.data.sysUser;
            const avatar =
              user.photoUrl === ''
                ? require('@/assets/images/profile.jpg')
                : user.photoUrl;
            // const avatar = require("@/assets/images/profile.jpg");
            if (res.data.roles && res.data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', res.data.roles);
              commit('SET_PERMISSIONS', res.data.permissions);
            } else {
              commit('SET_ROLES', ['ROLE_DEFAULT']);
            }
            commit('SET_USER_INFO', user);
            commit('SET_NAME', user.username);
            commit('SET_AVATAR', avatar);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            commit('SET_PERMISSIONS', []);
            commit('SET_EXPIRES_IN', null);
            commit('SET_USER_INFO', null);
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        commit('SET_PERMISSIONS', []);
        commit('SET_EXPIRES_IN', null);
        commit('SET_USER_INFO', null);
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
