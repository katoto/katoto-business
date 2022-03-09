import { normalizeLocaleConfig } from '@/utils/locales';

const menu = normalizeLocaleConfig({
  // menu 中 name 配置为中文，所以这里的 key 为中文
  menu: {
    首页: '首页',
    异步组件: '异步组件',
    国际化: '国际化',
    权限: '权限',
    表格: '表格',
    '表格.表单': '表单',
  },
});

export default {
  'hero.content': '内容来自于 src/locales/zh-CN.ts',
  // menu name
  ...menu,
};
