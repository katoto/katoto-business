import type { Route as LayoutRoute } from '@ant-design/pro-layout/lib/typings';
import {
  ExclamationCircleOutlined,
  SmileOutlined,
  CrownOutlined,
  CloudOutlined,
  BellOutlined,
  TabletOutlined,
} from '@ant-design/icons';

const configMap: Record<string, { name: string; icon: JSX.Element }> = {
  '/': {
    name: '首页',
    icon: <SmileOutlined />,
  },
  '/dynamic': {
    name: '异步组件',
    icon: <CrownOutlined />,
  },
  '/locales': {
    name: '国际化',
    icon: <CloudOutlined />,
  },
  '/access': {
    name: '权限',
    icon: <BellOutlined />,
  },
  '/table': {
    name: '表格与表单',
    icon: <TabletOutlined />,
  },
  '/404': {
    name: '404',
    icon: <ExclamationCircleOutlined />,
  },
};

const routeOrder = [
  '/',
  '/dynamic',
  '/locales',
  '/access',
  '/table',
  '/404',
  '/403',
];

/**
 * 在使用动态路由时，umi 不允许给页面添加 name 字段
 * 1. 编写自定义 layout 时，对原有的 route 对象，添加 name 与 icon 属性
 * 2. 路由添加 fallback，路由未匹配到时，跳转到 404
 */
export default function patchRoute(route: LayoutRoute) {
  const newRoute: LayoutRoute = {
    path: '/',
    routes: route.routes?.map((r) => ({
      ...r,
      ...(r.path ? configMap[r.path] : {}),
    })),
  };

  newRoute.routes?.sort((a, b) => {
    const i = routeOrder.indexOf(a.path!);
    const j = routeOrder.indexOf(b.path!);
    if (i !== -1) {
      return i - j;
    }
    return j - i;
  });
  return newRoute;
}
