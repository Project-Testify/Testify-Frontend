import {
  Table,
  TableProps,
  Button,
  Typography,
  Space,
} from 'antd';
import { Candidate } from '../../types';

const COLUMNS = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (_: any, { email }: Candidate) => (
      <Typography.Paragraph
        ellipsis={{ rows: 1 }}
        className="text-capitalize"
        style={{ marginBottom: 0 }}
      >
        {email.substring(0, 20)}
      </Typography.Paragraph>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_: any, { firstName, lastName }: Candidate) => (
      <Typography.Paragraph
        ellipsis={{ rows: 1 }}
        className="text-capitalize"
        style={{ marginBottom: 0 }}
      >
        {
          firstName + ' ' + lastName
        }
      </Typography.Paragraph>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Space>
        <Button type="primary" >Edit</Button>
        <Button type="primary" danger >Delete</Button>
        {/* View */}
        <Button type="primary" >View</Button>
      </Space>
    ),
  },
];

type Props = {
  data: Candidate[];
} & TableProps<any>;

export const CandidatesTable = ({ data, ...others }: Props) => {
  return (
    <Table
      dataSource={data}
      columns={COLUMNS}
      className="overflow-scroll"
      {...others}
    />
  );
};
