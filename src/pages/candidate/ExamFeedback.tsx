import { Typography, Row, Col, Card, Button } from 'antd';
import {
  HomeOutlined,
  CheckCircleOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { PageHeader } from '../../components';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import './FeedbackPage.css';

const { Title, Text } = Typography;

export const ExamFeedback = () => {
  const navigate = useNavigate();
  const handleDashboard = () => {
    navigate('/candidate/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Helmet>
        <title>Testify - Exam Feedback</title>
      </Helmet>
      <PageHeader
        title="Exam Feedback"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>Home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <ContainerOutlined />
                <span>Machine Learning - Quiz 3</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <CheckCircleOutlined />
                <span>Exam Feedback</span>
              </>
            ),
            path: '/',
          },
        ]}
      />
      <Row justify="center">
        <Col xs={24} sm={18} md={12} lg={10}>
          <Card
            style={{
              textAlign: 'center',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CheckCircleOutlined
              style={{
                fontSize: '48px',
                color: '#52c41a',
                marginBottom: '16px',
              }}
            />
            <Title level={2}>Submission Successful</Title>
            <Text
              style={{
                fontSize: '16px',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              Your answers have been submitted successfully.
            </Text>
            <Text
              style={{
                fontSize: '16px',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              Grading will be available soon. Please check back later for your
              results.
            </Text>
            <Button type="primary" size="large" onClick={handleDashboard}>
              Go to Dashboard
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExamFeedback;
