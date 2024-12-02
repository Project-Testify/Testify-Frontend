import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export const Moderating: React.FC = () => {
  const navigate = useNavigate();

  // Sample exam data
  const exams = [
    {
      id: 1,
      name: 'DSA 1201: Inclass 01',
      code: 'DSA 1201',
      startDate: '2024-12-01 10:00 AM',
    },
    {
      id: 2,
      name: 'Compiler Theory 1202: Inclass 02',
      code: 'CT 1202',
      startDate: '2024-12-05 02:00 PM',
    },
  ];

  const handleCardClick = (code: string) => {
    navigate(`/examSetter/moderating/review`);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {exams.map((exam) => (
          <Col key={exam.id} xs={24} sm={12} lg={8}>
            <Card
              title={exam.name}
              bordered={true}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(exam.code)}
            >
              <Text strong>Exam Code: </Text>
              <Text
                type="secondary"
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(exam.code);
                }}
              >
                {exam.code}
              </Text>
              <br />
              <Text strong>Start Date: </Text>
              <Text>{exam.startDate}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Moderating;
