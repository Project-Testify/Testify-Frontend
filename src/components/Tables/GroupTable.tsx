import {
  Table,
  TableProps,
  Button,
  Typography,
  Space,
} from 'antd';
import { Group } from '../../types';

const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'group_name',
    key: 'group_name',
    render: (_: any, { group_name }: Group) => (
      <Typography.Paragraph
        ellipsis={{ rows: 1 }}
        className="text-capitalize"
        style={{ marginBottom: 0 }}
      >
        {group_name.substring(0, 20)}
      </Typography.Paragraph>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (_: any, { description }: Group) => (
      <Typography.Paragraph
        ellipsis={{ rows: 1 }}
        className="text-capitalize"
        style={{ marginBottom: 0 }}
      >
        {description.substring(0, 20)}
      </Typography.Paragraph>
    ),
  },
  {
    title: 'Candidates',
    dataIndex: 'candidates',
    key: 'candidates',
    render: (_: any, { candidates }: Group) => (
      <Typography.Paragraph
        ellipsis={{ rows: 1 }}
        className="text-capitalize"
        style={{ marginBottom: 0 }}
      >
        {candidates}
      </Typography.Paragraph>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Space>
        <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}>Edit</Button>
        <Button type="primary" danger style={{ backgroundColor: '#f5222d', borderColor: '#f5222d' }}>Delete</Button>
      </Space>
    ),
  },
];

type Props = {
  data: Group[];
} & TableProps<any>;

export const GroupTable = ({ data, ...others }: Props) => {
  return (
    <Table
      dataSource={data}
      columns={COLUMNS}
      className="overflow-scroll"
      {...others}
    />
  );
};
