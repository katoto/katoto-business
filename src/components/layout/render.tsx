import { Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { RouteContext } from '@ant-design/pro-layout';
import { Link } from 'umi';
import type { IRoute } from 'umi';
import type { BasicLayoutProps } from '@ant-design/pro-layout';
import type { BreadcrumbProps } from 'antd';
import type { I } from '@/types/project';

import RouteContainer from './RouteContainer';
import styles from './index.less';

const { SelectLang } = require('umi');

export const menuHeaderRender: BasicLayoutProps['menuHeaderRender'] = function (
  logo,
  title,
) {
  return (
    <RouteContext.Consumer>
      {(value: I.ProjectRouteContext) => {
        const defaultContent = (
          <>
            {logo}
            {title}
          </>
        );
        const collasedContent = value.collapsedLogo ? (
          <img src={value.collapsedLogo} alt="LOGO" />
        ) : (
          logo
        );
        return value.collapsed === true ? collasedContent : defaultContent;
      }}
    </RouteContext.Consumer>
  );
};

export function getRightContentRender(
  initialState: I.InitialState,
  locales: boolean,
) {
  return function rightContentRender() {
    return (
      <Space>
        {/* locales 为 false 时，SelectLang 不存在 */}
        {SelectLang && locales ? <SelectLang /> : null}
        <Avatar shape="square" size="small" icon={<UserOutlined />} />
        <span className={styles.username}>{initialState?.username}</span>
      </Space>
    );
  };
}

export function childrenRender(children: JSX.Element) {
  return <RouteContainer children={children} />;
}

export const breadcrumbItemRender: BreadcrumbProps['itemRender'] = (route) => {
  if ((route as IRoute).component) {
    return <span>{route.breadcrumbName}</span>;
  }
  return <Link to={route.path}>{route.breadcrumbName}</Link>;
};
