import { Button, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import { Card } from '../../../components';



const TOPICS = [
  {
    title: 'Candidate',
    image: '/public/candidate_img.png',
    to: 'candidate',
    description : 'Join as a Candidate and Unlock Your Exam Potential',
  },
  {
    title: 'Organizations',
    image: '/public/aboutUs_image.png',
    to: 'organization',
    description : 'Sign Up as an Organization to Design and Manage Exams',
  },
  // {
  //   title: 'ExamSetter',
  //   image: UsergroupAddOutlined,
  //   to: 'examSetter',
  // },
];

const cardStyle: React.CSSProperties = {
  width: 620,
};

const imgStyle: React.CSSProperties = {
  // display: 'block',
  width: 280,
};

export const Select = () => {

  return (
    <Flex
      vertical
      align="center" // Always center, regardless of screen size
      justify="center"
      gap="middle"
      style={{ height: '100%', padding: '2rem' }}
    >
      {TOPICS.map((topic) => (
        <Link to={topic.to}>
          <Card
            hoverable
            style={cardStyle}
            styles={{ body: { padding: 0, overflow: 'hidden' } }}
          >
            <Flex justify="space-between">
              <img
                alt="avatar"
                src={typeof topic.image === 'string' ? topic.image : ''}
                style={imgStyle}
              />
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{ padding: 32 }}
              >
                <Typography.Title level={3}>
                  {topic.description}
                </Typography.Title>
                <Button
                  type="primary"
                >
                  Register as {topic.title}
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};
