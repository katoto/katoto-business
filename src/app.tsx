import type { RequestConfig } from 'umi';
import { errorAdaptor, errorHandler } from '@/apis/handler';
import { PageLoading } from '@ant-design/pro-layout';
import {
  menuHeaderRender,
  getRightContentRender,
  childrenRender,
  breadcrumbItemRender,
} from '@/components/layout/render';
import type { I } from '@/types/project';
import logo from '@/assets/logo.png';
import collapsedLogo from '@/assets/collapsed-logo.png';
import '@/styles/global.less';

const env = (document.documentElement.dataset.vanEnv || 'dev') as I.Env;

const apiHostMap: Record<I.Env, string> = {
  dev: 'path/to/dev-server-host',
  stg: 'path/to/stg-server-host',
  prod: 'path/to/prod-server-host',
};

const apiHost = apiHostMap[env];

// 定义 request 对象 https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  // 如果接口跨域，按照以下步骤配置代理：
  // 1. 覆盖下面配置 prefix: process.env.NODE_ENV === 'development' ? '/api' : apiHost
  // 2. 在 .umirc.ts 中配置 proxy 选项
  prefix: apiHost,

  credentials: 'include',
  timeout: 1000,

  // 如同 axios 一样，你可以添加 interceptor
  // requestInterceptors: [],
  // responseInterceptors: [],

  errorHandler,

  errorConfig: {
    // 对后端接口响应的数据进行校验
    adaptor: errorAdaptor(),
  },
};

// 模拟 App 初始化时的页面登录
function mockGetUserInfo() {
  return new Promise<{ username: string }>((resolve) => {
    setTimeout(() => {
      resolve({ username: 'admin' });
    }, 1000);
  });
}

// App 初始化时的数据
// 通常来说是获取当前用户信息，查询用户拥有的权限
export async function getInitialState(): Promise<I.InitialState> {
  const { username } = await mockGetUserInfo();
  return { username, env, apiHost };
}

// 页面初始化时的 loading
export const initialStateConfig = {
  loading: <PageLoading />,
};

// 项目的 layout 配置
export const layout = ({
  initialState,
}: {
  initialState: I.InitialState;
}): I.ProjectLayoutProps => {
  // plugin-layout 对有 locales 的功能有依赖
  // 不要直接关闭 locales 的功能，通过配置 projectLayoutLocales 来决定在是否在项目中开启
  const projectLayoutLocales = false;
  return {
    logo,
    collapsedLogo, // 侧边栏收起时显示的logo
    displayHistory: false,
    childrenRender,
    rightContentRender: getRightContentRender(
      initialState,
      projectLayoutLocales,
    ),
    itemRender: breadcrumbItemRender,
    waterMarkProps: {
      content: initialState.username,
    },
    menuHeaderRender,
  };
};
