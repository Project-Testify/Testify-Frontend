import { Button, Card, Col, message, Row } from 'antd';
import { Pie } from '@ant-design/charts';
import { Helmet } from 'react-helmet-async';
import { getLoggedInUser } from '../../utils/authUtils';

import { PageHeader } from '../../components';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { ExamResponse, ModerateExamResponse } from '../../api/types';
import { getExams } from '../../api/services/organization';
import { getModeratingExams } from '../../api/services/ExamSetter';

// Mock Data
const mockExams = [
  {
    id: 1,
    title: 'General Knowledge',
    duration: 60,
    startDatetime: '2024-12-04T10:00:00Z',
    endDatetime: '2024-12-04T12:00:00Z',
    hosted: true,
  },
  {
    id: 2,
    title: 'Basic Mathematics',
    duration: 45,
    startDatetime: '2024-12-05T09:00:00Z',
    endDatetime: '2024-12-05T09:45:00Z',
    hosted: false,
  },
  {
    id: 3,
    title: 'Data Structures and Algorithms',
    duration: 90,
    startDatetime: '2024-12-06T11:00:00Z',
    endDatetime: '2024-12-06T12:30:00Z',
    hosted: true,
  },
];

const mockPieData = [
  { type: 'Proctoring', value: 12 },
  { type: 'Moderating', value: 8 },
  { type: 'Grading', value: 5 },
];

export const ExamSetterDashBoardPage = () => {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error('You must be logged in to perform this action.');
    return null;
  }
  
  const organizationId = Number(sessionStorage.getItem('orgId'));
  const [examsData, setExams] = useState<ExamResponse[]>([]);
  const [proctoringExams, setProctoringExams] = useState<ExamResponse[]>([]);
  const [moderatingExams, setModeratingExams] = useState<ModerateExamResponse[]>([]);

  const fetchExams = async () => {
    try {
      const response = await getExams(organizationId);
      const allExams = response.data;
  
      const createdById = loggedInUser.id;
      const filteredExams = allExams.filter((exam) => exam.createdBy.id === createdById);
  
      console.log("Filtered Exams:", filteredExams);
      setExams(filteredExams);

      //const response1 = await getModeratingExams(createdById);
      //setModeratingExams(response1.data)
    } catch (error) {
      message.error("Error fetching exams");
      console.log(error);
    }
  };
  

  useEffect(()=>{
    fetchExams();
  },[organizationId]);

  const renderRecentlyAddedExams = () => (
    <Row gutter={[16, 16]}>
      {examsData.map((exam) => (
        <Col span={8} key={exam.id}>
          <Card
            bordered={false}
            hoverable
            style={{
              width: '100%',
              height: '230px', // Smaller card height
              background: 'rgba(230, 230, 255, 0.8)', // Light purple with transparency
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)', // Glass effect
            }}
          >
            <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>{exam.title}</h4>
            <p style={{ fontSize: '14px', marginBottom: '4px' }}>
              Duration: {exam.duration} mins
            </p>
            <p style={{ fontSize: '12px', marginBottom: '4px' }}>
              Start: {new Date(exam.startDatetime).toLocaleString()}
            </p>
            <p style={{ fontSize: '12px', marginBottom: '4px' }}>
              End: {new Date(exam.endDatetime).toLocaleString()}
            </p>
            <p>
              {exam.hosted ? (
                <span style={{ color: 'green', fontSize: '14px' }}>Hosted</span>
              ) : (
                <span style={{ color: 'red', fontSize: '14px' }}>Not Hosted</span>
              )}
            </p>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const [currentPage, setCurrentPage] = useState(0);
  const examsPerPage = 2;

  const renderUpcomingExams = () => {
    const examsToShow = mockExams.slice(currentPage * examsPerPage, (currentPage + 1) * examsPerPage);

    return (
      <div>
        <Row gutter={[16, 16]}>
          {examsToShow.map((exam) => (
            <Col span={24} key={exam.id}>
              <Card
                bordered={false}
                hoverable
                style={{
                  width: '100%',
                  background: 'rgba(144, 238, 144, 0.2)', // Light purple with transparency
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)', // Glass effect
                }}
              >
                <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>{exam.title}</h4>
                <p style={{ fontSize: '14px', marginBottom: '4px' }}>
                  Start: {new Date(exam.startDatetime).toLocaleString()}
                </p>
                <p style={{ fontSize: '14px', marginBottom: '4px' }}>
                  Duration: {exam.duration} mins
                </p>
              </Card>
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            type="primary"
            style={{ marginRight: '8px' }}
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            type="primary"
            disabled={(currentPage + 1) * examsPerPage >= mockExams.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  const pieChartConfig = {
    data: mockPieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
  };

  const ExamSetterName = loggedInUser.firstName;

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'Welcome ' + ExamSetterName}
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
                <PieChartOutlined />
                <span>dashboard</span>
              </>
            ),
          },
        ]}
      />
      <Helmet>
        <title>Exam Setter Dashboard</title>
      </Helmet>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Recently Added Exams">{renderRecentlyAddedExams()}</Card>
        </Col>
        <Col span={16}>
          <Card title="Exam Statistics">
            <Pie {...pieChartConfig} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Upcoming Exams">{renderUpcomingExams()}</Card>
        </Col>
      </Row>
    </div>
  );
};
