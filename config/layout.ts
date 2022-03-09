import { defineConfig } from 'umi';
const config = defineConfig({
  layout: {
    layout: 'side',
    // 更换标题
    title: 'Hll',
    // 国际化功能是关闭的，如果想开启，把 locale 设置成 'zh-CN'
    // 国际化语言
    // locale: 'zh-CN',
    locale: false,
    fixSiderbar: true,
    contentWidth: 'Fluid',
    splitMenus: false,
    navTheme: 'dark',
    fixedHeader: true,
    siderWidth: 220,
    colorWeak: false,
    // https://ant.design/components/icon-cn/#components-icon-demo-scriptUrl
    iconfontUrl: '',
  },
});

export const layout = config.layout;
