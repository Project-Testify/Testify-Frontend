import { Card, Button, Typography, Tooltip, Row, Col, Tag } from 'antd';
import {ClockCircleOutlined, CalendarOutlined, EyeFilled } from '@ant-design/icons';
import { ExamResponse } from '../../../../api/types';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface ExamListCardProps {
  exams: ExamResponse[];
}

export const ExamListCard = ({ exams }: ExamListCardProps) => {
  const navigate = useNavigate();
  const handleClick = (examId:any)=>{
    sessionStorage.setItem('examId',examId);
    navigate('/org-admin/new_exam');
  }
  
  return (
    <div>
      <Card title="Upcoming Exams" bordered={false} style={{ marginBottom: '20px' }}>
        <Row gutter={[24, 24]}>
          {exams.map((exam: ExamResponse) => (
            <Col xs={24} sm={24} md={12} lg={8} key={exam.id}>
              <Card
                title={exam.title}
                bordered={true}
                hoverable
                extra={
                  <Tooltip title="View Exam">
                    <Button type='primary' icon={<EyeFilled />} onClick={()=>handleClick(exam.id)}>View</Button>
                  </Tooltip>
                }
                style={{ marginBottom: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', height:'350px' }}
              >
                <Text>{exam.description}</Text>
                <br /><br/>
                <Text strong>
                  <ClockCircleOutlined /> Duration: 
                  <Tag bordered={false} color='magenta'>
                    {exam.duration} minutes
                  </Tag>
                </Text>
                <br />
                <Text strong>
                  <CalendarOutlined /> Start: <Tag bordered={false} color='green'>
                    {format(new Date(exam.startDatetime), 'MMMM dd, yyyy, HH:mm')}
                  </Tag>
                </Text>
                <br />
                <Text strong>
                  <CalendarOutlined /> End: <Tag bordered={false} color='volcano'>
                    {format(new Date(exam.endDatetime), 'MMMM dd, yyyy, HH:mm')}
                  </Tag>
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};
