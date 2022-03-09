import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Table,
  Typography,
  Select,
  Space,
  Divider,
} from 'antd';
import { useAntdTable } from 'ahooks';
import type { PaginatedParams } from 'ahooks/lib/useAntdTable';

const { Paragraph } = Typography;
const { Option } = Select;

interface ResultItem {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  total: number;
  list: ResultItem[];
}

const getTableData = (
  { current, pageSize }: PaginatedParams[0],
  formData: Record<string, unknown>,
): Promise<Result> => {
  let query = `page=${current}&size=${pageSize}`;
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      query += `&${key}=${value}`;
    }
  });

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};

export default () => {
  const [form] = Form.useForm();

  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 5,
    form,
  });

  const { submit, reset } = search;

  const columns = [
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
  ];

  const searchForm = (
    <div style={{ marginBottom: 12 }}>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="gender" name="gender">
              <Select style={{ width: 150, marginRight: 16 }} onChange={submit}>
                <Option value="">all</Option>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="email" name="email">
              <Input placeholder="email" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="phone" name="phone">
              <Input placeholder="phone" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Space>
              <Button type="primary" onClick={submit}>
                搜索
              </Button>
              <Button onClick={reset}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );

  return (
    <div>
      <Paragraph>
        对于表单页面推荐使用 useAntdTable 来快速创建 Table 与 Form
      </Paragraph>
      <Paragraph>
        执行 yarn run generate:route some-route --table 来快速创建表格筛选页面
      </Paragraph>
      <Divider />
      {searchForm}
      <Table columns={columns} rowKey="email" {...tableProps} />
    </div>
  );
};
