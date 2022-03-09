import { Result, Button } from 'antd';
import { Link } from 'umi';

function NoPermission() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="你没有页面的权限，请申请权限后再操作。"
      extra={
        <Button type="primary">
          <Link to="/">返回</Link>
        </Button>
      }
    />
  );
}

export default NoPermission;
