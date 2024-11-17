import { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, message } from 'antd';
const { Title } = Typography;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../../components';
import {SortingComponent} from '../../components';
import { HomeOutlined, ContainerOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompletedStatus = () => (
  <div style={{ color: 'green', display: 'flex', alignItems: 'center' }}>
    <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '8px' }} />
    <Title level={5} style={{ margin: 0 }}>Completed</Title>
  </div>
);

const ExpiredStatus = () => (
  <div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
    <FontAwesomeIcon icon={faTimesCircle} style={{ marginRight: '8px' }} />
    <Title level={5} style={{ margin: 0 }}>Expired</Title>
  </div>
);

const OngoingStatus = () => (
  <div style={{ color: 'blue', display: 'flex', alignItems: 'center' }}>
    <FontAwesomeIcon icon={faSpinner} style={{ marginRight: '8px' }} />
    <Title level={5} style={{ margin: 0 }}>Ongoing</Title>
  </div>
);

const UpcomingStatus = () => (
  <div style={{ color: 'orange', display: 'flex', alignItems: 'center' }}>
    <FontAwesomeIcon icon={faClock} style={{ marginRight: '8px' }} />
    <Title level={5} style={{ margin: 0 }}>Upcoming</Title>
  </div>
);

const formatDateTime = (dateTime: any) => {
  const date = new Date(dateTime);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}  ${hours}:${minutes}`;
};

const StatusComponent = ({ status }: { status: string }) => {
  switch (status) {
    case "COMPLETED":
      return <CompletedStatus />;
    case "EXPIRED":
      return <ExpiredStatus />;
    case "ONGOING":
      return <OngoingStatus />;
    case "UPCOMING":
      return <UpcomingStatus />;
    default:
      return null;
  }
};

type Exam = {
  id: number;
  title: string;
  status: string;
  organization: { name: string };
  totalMarks: number;
  startTime: string;
  endTime: string;
  duration: number;
};

export const CandidateAllExams = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [sortedExams, setSortedExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch exams from the API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8080/api/v1/candidate/exams', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
        message.error('Failed to load exams. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleSortedExamsChange = (sorted: Exam[]) => {
    setSortedExams(sorted);
  };

  const handleCardClick = (id: number) => {
    navigate(`/candidate/exam?id=${id}`);
  };

  return (
    <div>
      <Helmet>
        <title>Testify - All Exams</title>
      </Helmet>
      <PageHeader
        title="All Exams"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <ContainerOutlined />
                <span>All Exams</span>
              </>
            ),
            path: '/',
          },
        ]}
      />

      <div style={{ marginBottom: '16px' }}>
        <SortingComponent exams={exams} onSortedExamsChange={handleSortedExamsChange} />
      </div>

      <div>
        {loading ? (
          <div>Loading...</div>
        ) : sortedExams.length === 0 ? (
          <Card
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              margin: '16px 0',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <Title level={3}>No exams available at the moment.</Title>
            <p>Please check back later for available exams.</p>
          </Card>
        ) : (
          <Row gutter={[24, 24]}>
            {sortedExams.map((exam: Exam) => (
              <Col xs={24} sm={12} md={8} lg={8} key={exam.id}>
                <Card
                  style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
                  onClick={() => handleCardClick(exam.id)}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', height: '130px', justifyContent: 'space-between' }}>
                    <Row justify="space-between" align="middle">
                      <Col>
                        <StatusComponent status={exam.status} />
                      </Col>
                      <Col>
                        <Title level={5} style={{ margin: 0 }}>{exam.totalMarks} Marks</Title>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Title level={3} style={{ margin: 0 }}>{exam.title}</Title>
                      </Col>
                      <Col>
                        <Title level={5} style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>{exam.organization.name}</Title>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col>
                        <Title level={5} style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>
                          Start: {formatDateTime(exam.startTime)}
                        </Title>
                      </Col>
                      <Col>
                        <Title level={5} style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>
                          End: {formatDateTime(exam.endTime)}
                        </Title>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default CandidateAllExams;
