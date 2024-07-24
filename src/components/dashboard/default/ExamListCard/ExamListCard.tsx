import {
  Alert,
  Badge,
  Button,
  Card as AntdCard,
  CardProps,
  Flex,
  List,
  Space,
  Tag,
  Typography,
} from 'antd';
import { Exams } from '../../../../types';
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Card, Loader, UserAvatar } from '../../../index';

import './styles.css';

type Props = {
  data?: Exams[];
  loading?: boolean;
  error?: any;
} & CardProps;

export const ExamListCard = ({ data, error, loading, ...others }: Props) => {
  return (
    <Card
      title="Upcoming So so like this. Exams"
      extra={<Button>View all</Button>}
      className="exams-list-card card"
      {...others}
    >
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : loading ? (
        <Loader />
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
          }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 6,
            align: 'center',
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.exam_name} style={{ height: '100%' }}>
              <AntdCard
                hoverable
                bordered
                type="inner"
                style={{ height: '100%' }}
              >
                <Flex vertical gap="middle">
                  <Flex justify="space-between" align="center">
                    <Typography.Text strong className="text-capitalize">
                      {item.exam_name.slice(0, 20)}...
                    </Typography.Text>
                    <Tag className="text-capitalize">{item.exam_category}</Tag>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Tag
                      icon={<EnvironmentOutlined />}
                      color={item.exam_priority === 'high' ? 'red' : 'green'}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {item.exam_location}
                    </Tag>
                    <Badge
                      className="text-capitalize"
                      status={
                        item.exam_status.toLowerCase() === 'active'
                          ? 'success'
                          : item.exam_status.toLowerCase() === 'in progress'
                            ? 'processing'
                            : 'warning'
                      }
                      text={item.exam_status}
                    />
                  </Flex>
                  <Space>
                    <CalendarOutlined />
                    <Typography.Text>{item.exam_date}</Typography.Text>
                  </Space>
                  <UserAvatar fullName={item.exam_proctors[0]} size="middle" />
                </Flex>
              </AntdCard>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};
