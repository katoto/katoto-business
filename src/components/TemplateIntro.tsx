import { Card, Typography } from 'antd';
import { useModel } from 'umi';

const { Paragraph } = Typography;

export default function TemplateIntro() {
  const { appState } = useModel('app');
  return (
    <Card title="模板介绍" style={{ width: 300 }}>
      <Paragraph>{appState.intro}</Paragraph>
    </Card>
  );
}
