import { Typography, Tag, List } from 'antd';
import { getLocale, useIntl } from 'umi';

const { Paragraph, Title } = Typography;
const { Item } = List;

const steps = [
  '修改 config/layout.ts 中的 locale 为 "zh-CN"',
  '修改 app.tsx 中的 layout 函数中的 projectLayoutLocales 为 true',
  '将 src/_locales 重命名为 src/locales 即可',
];

function Locales() {
  // 使用 useIntl 来获取多语言的配置
  const intl = useIntl();
  return (
    <div className="locales">
      <Paragraph>如果你在控制台看到了报错，说明多语言功能并未开启。</Paragraph>
      <List
        style={{ marginBottom: 20 }}
        bordered
        header={<Title level={5}>开启国际化，按以下方式操作</Title>}
        dataSource={steps}
        renderItem={(step, index) => (
          <Item key={String(index)}>
            {index + 1}. {step}
          </Item>
        )}
      ></List>
      <Paragraph>
        当前的语言环境为 <Tag>{getLocale()}</Tag>。
      </Paragraph>
      <Paragraph>下方文本根据语言环境自动切换。</Paragraph>
      <Paragraph>
        {intl.formatMessage({
          id: 'hero.content',
          defaultMessage: '国际化功能未支持',
        })}
      </Paragraph>
    </div>
  );
}

export default Locales;
