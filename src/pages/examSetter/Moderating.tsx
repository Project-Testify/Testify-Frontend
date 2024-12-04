import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getModeratingExams } from '../../api/services/ExamSetter'; // Import your Axios function
import { ModerateExamResponse } from '../../api/types'; // Import the interface

const { Text } = Typography;

export const Moderating: React.FC = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<ModerateExamResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch moderating exams
  const fetchModeratingExams = async () => {
    const user = sessionStorage.getItem('user'); // Retrieve the user object from session storage
  
    if (!user) {
      message.error("User not found in session storage.");
      setLoading(false);
      return;
    }
  
    try {
      const parsedUser = JSON.parse(user); // Parse the user object
      const userIdValue = parsedUser?.id; // Extract the user ID
  
      if (!userIdValue) {
        message.error("User ID is missing in session storage.");
        setLoading(false);
        return;
      }
  
      const response = await getModeratingExams(userIdValue); // Call the API with the user ID
      setExams(response.data || []); // Update state with the response data
    } catch (error) {
      message.error("Failed to fetch exams.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModeratingExams();
  }, []);

  const handleCardClick = (examId: string) => {
    sessionStorage.setItem('moderateExam', examId); // Save exam ID in session storage
    navigate(`/examSetter/moderating/review`); // Navigate to the desired route
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!exams || exams.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <Typography.Title level={4}>No moderating exams available.</Typography.Title>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {exams.map((exam) => (
          <Col key={exam.id} xs={24} sm={12} lg={8}>
            <Card
              title={exam.title}
              bordered={true}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(exam.id.toString())}
            >
              <Text strong>Exam Code: </Text>
              <Text
                type="secondary"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(exam.id.toString());
                }}
              >
                {exam.id}
              </Text>
              <br />
              <Text strong>Start Date: </Text>
              <Text>{new Date(exam.startDatetime).toLocaleString()}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Moderating;
