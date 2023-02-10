import { defineStore } from 'pinia';
import { UserState } from './types';

import { localStorage } from '@/utils/storage';
import { loginApi, logoutApi } from '@/api/auth';
import { getUserInfo } from '@/api/user';
import { resetRouter } from '@/router';
import { LoginForm } from '@/api/auth/types';

const useUserStore = defineStore({
  id: 'user',

  // 状态
  state: (): UserState => ({
    token: localStorage.get('token') || '',
    nickname: '',
    avatar: '',
    roles: [],
    perms: []
  }),

  // 操作
  actions: {
    async RESET_STATE() {this.$reset();},

     //登录
    login(data: LoginForm) {
      const { username, password } = data;
      return new Promise((resolve, reject) => {
        loginApi({
          grant_type: 'password',
          username: username.trim(),
          password: password
        })
          .then(response => {
            const accessToken = response.data;
            localStorage.set('token', accessToken);
            // 这里只是先存了用户的token信息 roles、perms等信息在permission.ts中调用getUserInfo()API获取
            this.token = accessToken;
            resolve(accessToken);  // 执行resolve()就会执行调用本程序的Promise中的.then() 在login.vue里
          })
          .catch(error => {
            reject(error);
          });
      });
    },

     // 获取用户信息（昵称、头像、角色集合、权限集合）
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo().then(({ data }) => {
            if (!data) {
              console.error('Verification failed, please Login again.');
              return reject('Verification failed, please Login again.');
            }
            const { nickname, avatar, roles, perms } = data;
            if (!roles || roles.length <= 0) {
              console.error('getUserInfo: roles must be a non-null array!')
              reject('getUserInfo: roles must be a non-null array!');
            }
            this.nickname = nickname;
            this.avatar = avatar;
            this.roles = roles;
            this.perms = perms;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

     //注销
    logout() {
      return new Promise((resolve, reject) => {
        logoutApi()
          .then(() => {
            localStorage.remove('token');
            this.RESET_STATE();
            resetRouter();
            resolve(null);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

     // 清除Token
    resetToken() {
      return new Promise(resolve => {
        localStorage.remove('token');
        this.RESET_STATE();
        resolve(null);
      });
    }
  }
});

export default useUserStore;
