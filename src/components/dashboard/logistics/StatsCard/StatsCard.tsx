import React from 'react';
import { CardProps, Flex, Typography } from 'antd';
import { Card } from '../../../index.ts';
import CountUp from 'react-countup';

type Props = {
  title: string;
  value: number;
  diff: number;
  icon: any;
} & CardProps;

export const StatsCard = ({ icon, title, value, diff, ...others }: Props) => {
  return (
    <Card style={{ width: '100%', height: '100%' }} {...others}>
      <Flex vertical gap="middle" style={{ width: '100%', height: '100%' }}>
        {React.createElement(icon, { style: { fontSize: 50, color:'rgb(109 118 237 / 100%)' } })}
        <Typography.Text style={{ textTransform: 'capitalize' }}>
          {title}
        </Typography.Text>
        <Flex gap="small" align="center" justify="space-between">
          <Typography.Title level={2} className="m-0">
            <CountUp end={value} />
          </Typography.Title>
          {/* <Typography.Text
            strong
            style={{ color: diff > 0 ? green[5] : red[5] }}
          >
            {diff}%&nbsp;
            {diff > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          </Typography.Text> */}
        </Flex>
      </Flex>
    </Card>
  );
};
