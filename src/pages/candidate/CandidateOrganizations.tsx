import { Card, Typography, Col, Row } from 'antd';

export const CandidateOrganizations = () => {
  
  const  organizations = [
    {
      key:1,
      name: 'University of Colombo School of Computing',
      address: '35, Reid Avenue, Colombo 00700',
      contact: '011 2581245',
    },
    {
      key:2,
      name: 'Institute of Java and Software Engineering',
      address: 'No. 1, Galle Road, Colombo 00300',
      contact: '011 2581245',
    },
    {
      key:3,
      name: 'University of Moratuwa',
      address: 'Katubedda, Moratuwa 10400',
      contact: '011 2581245',
    },
  ]

  const Exams = [
    {
      key:1,
      name: 'Exam 1',
      date: 'Date 1',
      time: 'Time 1',
      org_id: 'Organization 1',
    },
    {
      key:2,
      name: 'Exam 2',
      date: 'Date 2',
      time: 'Time 2',
      org_id: 'Organization 2',
    },
    {
      key:3,
      name: 'Exam 3',
      date: 'Date 3',
      time: 'Time 3',
      org_id: 'Organization 1',
    },
    {
      key:4,
      name: 'Exam 4',
      date: 'Date 4',
      time: 'Time 4',
      org_id: 'Organization 2',
    },
  ]

  return ( 
    <div>
      <Typography.Title level={3}>Your Organizations</Typography.Title>
      <Row>
          {organizations.map((org) => (
            <Col lg={24}>
              <Card key={org.name}>
                  <Typography.Title level={4}>{org.name}</Typography.Title>
                  <Typography.Text>{org.address}</Typography.Text>
                  <Typography.Text>{org.contact}</Typography.Text>
                  {Exams.map((exam) =>(
                    exam.org_id === org.name && (
                      <Card key={exam.name}>
                        <Typography.Title level={5}>{exam.name}</Typography.Title>
                        <Typography.Text>{exam.date}</Typography.Text>
                        <Typography.Text>{exam.time}</Typography.Text>
                      </Card>
                    )
                  ))}
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};