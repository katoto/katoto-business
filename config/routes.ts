import { IRoute } from 'umi';

/**
 * 约定式路由无法与 layout 很好的配合。
 * 如果你更喜欢约定式路由，你可以参考 src/utils/modify-conventional-route 来调整路由
 */
const pageRoutes: IRoute[] = [
  {
    path: '/',
    exact: true,
    name: '首页',
    // icon 为组件名小写后去掉 outlined 或者 filled 或者 twotone
    icon: 'smile',
    // 相对路由，相对 src/pages
    component: 'index',
  },
  {
    path: '/dynamic',
    name: '异步组件',
    icon: 'crown',
    exact: true,
    // 当然你可以用绝对路径
    component: '@/pages/dynamic',
  },
  {
    path: '/access',
    name: '权限',
    icon: 'smile',
    component: 'access',
    // 权限
    access: 'canOpenAccess',
  },
  {
    path: '/table',
    name: '表格',
    icon: 'table',
    routes: [
      {
        path: '/table',
        redirect: '/table/form',
      },
      // 嵌套路由使用时，path 不会拼接。必须写全
      {
        path: '/table/form',
        name: '表单',
        strict: true,
        icon: 'table',
        component: 'table',
      },
    ],
  },
  {
    path: '/locales',
    component: 'locales',
    name: '国际化',
    icon: 'cloud',
  },
  // fallback 路由
  {
    path: '/404',
    component: '404',
    title: '404',
  },
  {
    path: '*',
    redirect: '/404',
  },
];

export const routes: IRoute[] = pageRoutes;
