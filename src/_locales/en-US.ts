import { normalizeLocaleConfig } from '@/utils/locales';

const menu = normalizeLocaleConfig({
  menu: {
    首页: 'index',
    异步组件: 'dynamic',
    国际化: 'locales',
    权限: 'access',
    表格: 'table',
    '表格.表单': 'form',
  },
});

export default {
  'hero.content': 'Content form src/locales/en-US.ts',
  // menu name
  ...menu,
};
