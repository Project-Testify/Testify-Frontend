import { Typography } from "antd";
const { Title} = Typography;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../../components';
import { HomeOutlined, ContainerOutlined } from '@ant-design/icons';
import { Card, Col, Row } from 'antd';

export const CandidateUpcomingExams = () => {
  const exams = [
    { id: 1, name: "Compiler Theory Flex & Bison", status: "upcoming", code: "S102" },
    { id: 2, name: "Machine Learning - Quiz 3", status: "upcoming", code: "S103" },
    { id: 3, name: "HCI UI/UX Challenge 02", status: "upcoming", code: "S104" },
    { id: 4, name: "Graph Assignment 02", status: "upcoming", code: "S105" },
    { id: 5, name: "HCI UI/UX Challenge 01", status: "upcoming", code: "S106" },
  ];

  const UpcomingStatus = () => (
    <div style={{ color: 'orange', display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faClock} style={{ marginRight: '8px' }} />
      <Title level={5} style={{ margin: 0 }}>Upcoming</Title>
    </div>
  );

  const StatusComponent = ({ status }: { status: string }) => {
    switch (status) {
      case "upcoming":
        return <UpcomingStatus />;
      default:
        return null;
    }
  };
    
  return (
    <div>
      <Helmet>
        <title>Testify - Upcoming Exams</title>
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
                        <span>Upcoming Exams</span>
                    </>
                ),
                path: '/',
            }
        ]}
      />

      <div style={{ padding: '0px' }}>
        {/* <Title level={2}>All Exams</Title> */}
        <Row gutter={[24, 24]}>
          {exams.map((exam) => (
            <Col xs={24} sm={12} md={8} lg={8} key={exam.id}>
              <Card
                style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
              >
                <div style={{ display: 'flex', flexDirection: 'column', height: '130px', justifyContent: 'space-between' }}>

                  {/* Section 1: Flexbox layout */}
                  <Row
                    justify="space-between"
                    align="middle"
                  >
                    <Col >
                      <StatusComponent status={exam.status} />
                    </Col>
                    <Col >
                      <Title level={5} style={{ margin: 0 }}>{exam.code}</Title>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Title level={3} style={{ margin: 0 }}>{exam.name}</Title>
                    </Col>
                    <Col>
                      <Title level={5} style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>University of Colombo</Title>
                    </Col>
                  </Row>

                  <Row justify="space-between">
                    {/* start and end datetime */}
                    <Col>
                      <Title level={5} style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>Start: 2021-08-01 10:00</Title>
                    </Col>
                    <Col>
                      <Title level={5} style={{ margin: 0, fontSize: '12px', opacity: 0.6 }}>End: 2021-08-01 11:00</Title>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};