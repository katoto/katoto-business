import { useState } from 'react';
import { Button, Typography } from 'antd';
import AsyncTemplateIntro from '@/asyncs/AsyncTemplateIntro';

const { Title, Paragraph } = Typography;

function DynamicPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <Title level={5}>加载异步组件</Title>
      <Paragraph>
        在 src/asyncs 文件下定义了异步组件 AsyncTemplateIntro
      </Paragraph>
      <Paragraph>打开浏览器控制台，可以观察到该组件被异步加载了</Paragraph>
      <Button disabled={loaded} onClick={() => setLoaded(true)}>
        点击加载
      </Button>
      {loaded ? <AsyncTemplateIntro /> : null}
    </div>
  );
}

export default DynamicPage;
