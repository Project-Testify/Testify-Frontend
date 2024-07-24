import { Flex, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

import { Card } from '../../../components';

import { UserOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { createElement } from 'react';

const { Text } = Typography;

const TOPICS = [
  {
    title: 'Candidate',
    image: UserOutlined,
    to: 'candidate',
  },
  {
    title: 'Organizations',
    image: TeamOutlined,
    to: 'organization',
  },
  {
    title: 'ExamSetter',
    image: UsergroupAddOutlined,
    to: 'examSetter',
  },
];

export const Select = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });

  return (
    <Flex
      vertical
      align="center" // Always center, regardless of screen size
      justify="center"
      gap="middle"
      style={{ height: '100%', padding: '2rem' }}
    >
      {TOPICS.map((topic) => (
        <Link to={topic.to} style={{ width: '100%' }}> {/* Make the Link full width */}
          <Card
            hoverable
            style={{
              width: isMobile ? '100%' : '25%',
              textAlign: 'center',
            }}
          >
            <Flex vertical gap="middle">
              {createElement(topic.image, {
                style: { fontSize: '1.5rem', margin: 'auto' },
              })}
              <Text style={{ textTransform: 'capitalize' }}>{topic.title}</Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
}
