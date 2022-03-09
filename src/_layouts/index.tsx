import type { IRouteComponentProps } from 'umi';
import { Link, useModel } from 'umi';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import logo from '@/assets/logo.png';
import modifyRoute from '@/utils/modify-conventional-route';
import styles from './index.less';
import {
  getRightContentRender,
  childrenRender,
} from '@/components/layout/render';

const layoutProps: BasicLayoutProps = {
  // 布局方式: mix | side | top
  layout: 'side',
  // 更换标题
  title: 'Hll',
  // 国际化语言
  locale: 'zh-CN',
  fixSiderbar: true,
  contentWidth: 'Fluid',
  splitMenus: false,
  navTheme: 'dark',
  fixedHeader: true,
  siderWidth: 220,
  colorWeak: false,
  // https://ant.design/components/icon-cn/#components-icon-demo-scriptUrl
  iconfontUrl: '',
  logo,
};

export default function PageLayout({
  children,
  location,
  route,
}: IRouteComponentProps) {
  // 配置该属性决定是否需要在项目中开启多语言
  const projectLayoutLocales = false;
  const { initialState, error } = useModel('@@initialState');

  if (error) {
    // eslint-disable-next-line no-console
    console.error('初始状态失败', error);
    return null;
  }

  if (!initialState) {
    return null;
  }

  // 对于约定式路由，给路由添加 icon 与 name，从而显示在侧边栏中
  const layoutRoute = modifyRoute(route);
  return (
    <div className={styles.pageLayout}>
      <ProLayout
        {...layoutProps}
        location={location}
        route={layoutRoute}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children) {
            return menuItemProps.name;
          }
          if (menuItemProps.path && location.pathname !== menuItemProps.path) {
            return <Link to={menuItemProps.path}>{menuItemProps.name}</Link>;
          }
          return menuItemProps.name;
        }}
        rightContentRender={getRightContentRender(
          initialState,
          projectLayoutLocales,
        )}
      >
        {childrenRender(children)}
      </ProLayout>
    </div>
  );
}
