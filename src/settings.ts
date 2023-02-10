interface DefaultSettings {
  title: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  showSidebarLogo: boolean;
  errorLog: string;
  AMapKey: string;
}

const defaultSettings: DefaultSettings = {
  title: 'vue3-element-admin-dh',
  showSettings: false,  // 右侧的设置按钮
  tagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,  // 是否显示Logo
  errorLog: 'production',
  AMapKey: '76627b5b57a190a4ff2f8319c87a7e29',  // 高德地图的key
};

export default defaultSettings;
