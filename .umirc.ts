import { defineConfig } from 'umi';
import { routes } from './config/routes';
import { layout } from './config/layout';
import { theme } from './config/theme';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  devtool: 'source-map',
  favicon: '/favicon.ico',
  van: {},
  fastRefresh: {},
  // 约定式路由：此配置会启用路由按需加载功能
  // dynamicImport: {},

  // 开启此配置支持 import() 语法的 code splitting
  dynamicImportSyntax: {},
  cssLoader: {
    localsConvention: 'camelCase',
  },
  // Umi 默认情况下使用 babel-loader 来编译代码
  // 推荐在本地开发时，开启 typescript 检查
  ...(process.env.NODE_ENV === 'development' ? { forkTSChecker: {} } : {}),
  // 中台应用使用了 layout 插件，locales 的功能不要直接关闭
  // https://github.com/umijs/umi/issues/4075
  // https://github.com/ant-design/ant-design-pro/issues/7546
  // https://github.com/ant-design/ant-design-pro/issues/7321
  locale: {
    default: 'zh-CN',
    antd: true,
  },
  ignoreMomentLocale: true,

  // 配置声明式路由（如果使用约定式路由，注释此配置项）
  routes,

  // layout 配置
  layout,

  // antd 主题，配置 less 变量
  theme,

  // 配置请求，取响应内容中的 data 字段
  request: {
    dataField: 'data',
  },

  // mock 功能默认开启，设置 false 来关闭
  // mock: false,

  /**
   * 设置 API 转发
   * 查看文档：https://styleguidist-v-stg.huolala.cn/docs/react/react-boilerplate/react-pc#接口请求
   */
  // proxy: {
  //   '/api': {
  //     target: 'path/to/server-host',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   },
  // },
});
