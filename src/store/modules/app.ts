import { AppState } from './types';
import { localStorage } from '@/utils/storage';
import { defineStore } from 'pinia';

const useAppStore = defineStore({
  id: 'app',

  state: (): AppState => ({
    device: 'desktop',

    // 控制侧边菜单栏显示/隐藏
    sidebar: {
      opened: localStorage.get('sidebarStatus') ? !! + localStorage.get('sidebarStatus') : true,
      withoutAnimation: false,
    },
    size: localStorage.get('size') || 'default',
  }),

  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        localStorage.set('sidebarStatus', 1);
      } else {
        localStorage.set('sidebarStatus', 0);
      }
    },

    closeSideBar(withoutAnimation: any) {
      localStorage.set('sidebarStatus', 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },

    toggleDevice(device: string) {
      this.device = device;
    },

    setSize(size: string) {
      this.size = size;
      localStorage.set('size', size);
    },

  },
});

export default useAppStore;
