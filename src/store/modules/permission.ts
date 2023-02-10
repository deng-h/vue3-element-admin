import { PermissionState } from './types';
import { RouteRecordRaw } from 'vue-router';
import { defineStore } from 'pinia';
import { constantRoutes } from '@/router';
import { listRoutes } from '@/api/menu';

const modules = import.meta.glob('../../views/**/**.vue');  // 引入views下的所有vue
export const Layout = () => import('@/layout/index.vue');

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    // 角色数组中包含ROOT角色直接返回true
    if (roles.includes('ROOT')) {
      return true;
    }
    // Array.some()是内置的TypeScript函数，用于检查数组中的某些元素是否通过了由提供的函数实现的测试
    // 如果此数组中的某些元素满足提供的测试函数，则此方法返回true
    // 角色数组中不包含ROOT的情况
    return roles.some(role => {
      //这里的?表示这个meta属性有可能不存在
      if (route.meta?.roles !== undefined) {
        // 如果该条菜单的记录里也包含所给定的角色 也返回true
        return (route.meta.roles as string[]).includes(role);
      }
    });
  }
  return false;
};

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = [];
  routes.forEach(route => {
    const tmp = { ...route } as any;
    if (hasPermission(roles, tmp)) {
      if (tmp.component == 'Layout') {
        tmp.component = Layout;
      } else {
        // 举例 数据库某条记录 component属性值为system/user/index
        // 所以这里拼接成完整的vue文件路径
        const component = modules[`../../views/${tmp.component}.vue`] as any;
        if (component) {
          tmp.component = component;
        } else {
          tmp.component = modules[`../../views/error-page/404.vue`];
        }
      }
      res.push(tmp);

      // 递归
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
    }
  });
  return res;
};

const usePermissionStore = defineStore({
  id: 'permission',

  state: (): PermissionState => ({
    // 全部路由
    routes: [],
    // 根据角色额外添加的那部分路由
    addRoutes: []
  }),

  actions: {

    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes;
      // concat()方法返回一个由此数组组成的新数组，该数组与两个或多个数组连接
      this.routes = constantRoutes.concat(routes);
    },

    // 获取路由信息
    generateRoutes(roles: string[]) {
      return new Promise((resolve, reject) => {
        listRoutes()
          .then(response => {
            const asyncRoutes = response.data;
            const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);  // 根据角色信息对所获得的完整的路由表进行过滤
            this.setRoutes(accessedRoutes);
            resolve(accessedRoutes);
          })
          .catch(error => {
            console.error("获取路由列表失败");
            console.error(error);
            reject(error);
          });
      });
    }
  }
});

export default usePermissionStore;
