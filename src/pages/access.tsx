import { useAccess, Access } from 'umi';
import { Typography, Alert } from 'antd';

const { Paragraph, Title } = Typography;

function AccessPage() {
  const access = useAccess();

  return (
    <div className="access">
      <Title level={5}>页面权限校验</Title>
      <Paragraph>通过在路由配置中添加 access 来对页面进行权限的校验</Paragraph>
      <Paragraph>该页面使用 canOpenAccess 来进行权限的校验</Paragraph>

      <Title level={5}>页面区块权限校验</Title>
      {/* 你可以把这里的值改为 'xyz' 来观察效果 */}
      <Access
        accessible={access.canViewButton('vue')}
        fallback={
          <Alert
            message="你没有该模块的权限"
            type="warning"
            style={{ width: '300px' }}
          />
        }
      >
        <Alert
          type="info"
          message="你有该模块的权限"
          style={{ width: '300px' }}
        />
        <Paragraph>使用 Access 组件来对区块进行权限控制</Paragraph>
      </Access>
    </div>
  );
}

export default AccessPage;
