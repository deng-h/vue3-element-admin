import { createApp, Directive } from 'vue';
import App from './App.vue';
import router from '@/router';

import { createPinia } from 'pinia';  //Pinia 是 Vue.js 的轻量级状态管理库，Vuex的替代方案  Pinia就是Vuex 5

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import Pagination from '@/components/Pagination/index.vue';
import '@/permission';

import 'default-passive-events';

// 引入svg注册脚本 项目创建 src/assets/icons 文件夹，存放 iconfont载的SVG图标
import 'virtual:svg-icons-register';

// 国际化
import i18n from '@/lang/index';

// 自定义样式
import '@/styles/index.scss';

// 根据字典编码获取字典列表全局方法
import { listDictItemsByTypeCode } from '@/api/dict';

const app = createApp(App);

// 自定义指令
import * as directive from '@/directive';

Object.keys(directive).forEach(key => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});

// 全局方法
app.config.globalProperties.$listDictItemsByTypeCode = listDictItemsByTypeCode;

// 注册全局组件
app
  .component('Pagination', Pagination)
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .mount('#app');
