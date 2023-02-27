import { UserConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// @see: https://gitee.com/holysheng/vite2-config-description/blob/master/vite.config.ts
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());  // 获取 .env 环境配置文件

  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],  // 指定需要缓存的图标文件夹
        symbolId: 'icon-[dir]-[name]'  // 指定symbolId格式
      }),
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
    ],
    // 本地反向代理解决浏览器跨域限制
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 本地API地址
          target: 'http://localhost:8181/',
          changeOrigin: true,
          // 匹配以[env.VITE_APP_BASE_API]开头的路径，重写为空字符串
          rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
        },
      }
    },
    resolve: {
      alias: {
        '@': path.resolve('./src')  // 相对路径别名配置，使用 @ 代替 src
      }
    }
  };
};
