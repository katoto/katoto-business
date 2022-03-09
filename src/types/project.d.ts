import type {
  BasicLayoutProps,
  RouteContextType,
} from '@ant-design/pro-layout';

declare namespace I {
  // 应用的环境
  export type Env = 'dev' | 'stg' | 'prod';

  // 应用的初始状态，根据应用配置
  export type InitialState = {
    env: Env;
    username: string;
    apiHost: string;
  };

  // 访问历史
  export type VisitHistoryItem = {
    name: string;
    path: string;
    active: boolean;
  };
  export type VisitHistory = VisitHistoryItem[];

  // 应用 layout 配置
  export type ProjectLayoutProps = BasicLayoutProps & {
    // umi 提供的 .d.ts 文件未包含 childrenRender 的定义，https://github.com/umijs/plugins/blob/440826637c9fccd69dc9dca46ad97d6e79b1b573/packages/plugin-layout/src/layout/index.tsx.tpl#L133
    // https://github.com/umijs/plugins/blob/b86cd55407a80fb8c14eb9403cd8cc06c0153997/packages/plugin-layout/CHANGELOG.md#070-2020-03-24
    childrenRender: (dom: JSX.Element) => React.ReactNode;
    // 是否显示浏览历史，模板支持的功能
    displayHistory: boolean;
    collapsedLogo?: string;
  };

  export type ProjectRouteContext = RouteContextType & {
    collapsedLogo?: string;
  };

  // 接口响应结构
  export type ResponseStructure = Record<string, any>;

  // UCenter 未登陆的错误信息
  export interface UnauthorizedData {
    meta: {
      login_url: string;
    };
  }
}
