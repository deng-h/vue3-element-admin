import router from '@/router';
import useStore from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false }); // 进度环显示/隐藏

// 白名单路由
const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const { user, permission } = useStore();  // store里的modules相当于一个个类 他们有自己的属性和方法
  const hasToken = user.token;  // user的token属性
  if (hasToken) {
    // 登录成功，跳转到首页
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasGetUserInfo = user.roles.length > 0;
      // 已经有用户数据
      if (hasGetUserInfo) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name as any }) : next('/401');
        } else {
          next();
        }
      } else {
        // 没有用户数据 调用接口来获取
        try {
          await user.getUserInfo();
          const roles = user.roles;
          
          const accessRoutes: any = await permission.generateRoutes(roles);
          accessRoutes.forEach((route: any) => {
            router.addRoute(route);
          });
          console.log("router=", router);
          
          next({ ...to, replace: true });
        } catch (error) {
          await user.resetToken();  // 移除 token 并跳转登录页
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
