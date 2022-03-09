import { useEffect } from 'react';
import { useRequest, useModel } from 'umi';
import { Typography, List } from 'antd';
import { useInterval } from 'ahooks';
import { getTodos } from '@/apis';
import styles from './index.less';

const { Paragraph, Title } = Typography;

const featureList = [
  {
    title: '路由',
    content:
      '对于有侧边栏的中台应用，推荐使用声明式路由。修改 config/routes.ts 来添加新的路由。如果你想用约定式路由，先注释 .umirc.ts 里的 routes配置项，约定式路由布局可以参考 src/_layouts 中的示例代码。',
  },
  {
    title: '接口请求',
    content:
      '接口请求使用 umi-request。该页面调用了 api/users/ 接口，打开控制台查看请求的详情。',
  },
  {
    title: '状态管理',
    content:
      '使用 Hook 来进行状态管理。在 src/models/app.ts 定义状态，通过 useModel 来获取。',
  },
  {
    title: 'Hook',
    content:
      '集成 ahooks，你可以使用一些通过 hook，比如 useDebounce，useInterval 等。',
  },
  {
    title: 'Mock 与接口 Proxy',
    content:
      '在 mock 文件夹下定义接口数据。如果你想用接口转发的话，可以在 .umirc.ts 中配置 proxy 代理。',
  },
  {
    title: '表格与表单',
    content:
      '使用 useAntdTable 来快速创建有筛选功能的表单。你可以执行 yarn run generate:route your-page --table 快速生成。',
  },
  {
    title: '主题定制',
    content: '修改 config/theme.ts 中的 less 变量来配置 antd 主题。',
  },
  {
    title: '国际化',
    content: '如果你需要多语言支持，点击左侧菜单中「国际化」，查看更多细节。',
  },
];

function IndexPage() {
  // 使用 useRequest 来请求数据
  // 在 .umirc 中 request.dataField，因此这里可以直接获取数据
  const { data: todos, loading } = useRequest(getTodos);

  // 使用 useModel 获取通用状态
  const { app } = useModel('app', (model) => ({
    app: model.appState,
  }));

  // https://ahooks.js.org/zh-CN/hooks/side-effect/use-interval
  useInterval(() => {
    // eslint-disable-next-line no-console
    console.log('每隔 1s 执行一次');
  }, 1000);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('userList 接口请求状态: ', loading);
    // eslint-disable-next-line no-console
    console.log(
      '通过配置 request 插件中的 dataField 字段，来直接获取接口的 data',
      todos,
    );
  }, [todos, loading]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('通用的状态 app ', app);
  }, [app]);

  return (
    <div className={styles.indexPage}>
      <List
        header={<Title level={4}>Umi 快速入门</Title>}
        dataSource={featureList}
        renderItem={(item) => (
          <List.Item>
            <div>
              <Title level={5}>{item.title}</Title>
              <Paragraph>{item.content}</Paragraph>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default IndexPage;
