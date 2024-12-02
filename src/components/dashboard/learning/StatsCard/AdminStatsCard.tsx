import { CardProps, Col, Flex, Row, Typography } from 'antd';
import { Card } from '../../../index.ts';
import CountUp from 'react-countup';
import { BankOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';

type Props = {
  title: string;
  value1: number;
  value2: number;
  icon: any;
  color: string;
  progress: number;
} & CardProps;

export const AdminStatsCard = ({
  color,
  icon,
  title,
  value1,
  value2,
  progress,
  ...others
}: Props) => {
  return (
    <Card {...others}>
      <Row>
        <Col lg={12}>
          <Card style={{ backgroundColor: 'rgb(109 118 237 / 50%)' }}>
            <Flex vertical>
              <UsergroupAddOutlined style={{ fontSize: '30px' }} />
              <Typography.Title level={2} style={{ margin: 0 }}>
                <CountUp end={value1} />
              </Typography.Title>
              <Typography.Text style={{ marginTop: 0 }}>
               Total Users
              </Typography.Text>
            </Flex>
          </Card>
        </Col>
        <Col lg={12}>
          <Card style={{ backgroundColor: 'rgb(109 118 237 / 100%)' }}>
            <Flex vertical>
              <BankOutlined style={{ fontSize: '30px' }} />
              <Typography.Title level={2} style={{ margin: 0 }}>
                <CountUp end={value2} />
              </Typography.Title>
              <Typography.Text style={{ marginTop: 0 }}>
                Total Organizations
              </Typography.Text>
            </Flex>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
