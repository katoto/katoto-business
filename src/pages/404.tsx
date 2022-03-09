import { Result, Button } from 'antd';
import { Link } from 'umi';

function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="请先检查 URL 是否正确。"
      extra={
        <Button type="primary">
          <Link to="/">返回</Link>
        </Button>
      }
    />
  );
}

export default NotFound;
