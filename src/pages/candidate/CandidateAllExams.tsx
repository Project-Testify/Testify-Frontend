import { Typography, Row, Col } from 'antd';
const { Title } = Typography;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSpinner, faClock } from '@fortawesome/free-solid-svg-icons';

const exams = [
  { id: 1, name: "Compiler Theory Flex & Bison", status: "completed", code: "S102" },
  { id: 2, name: "Middleware rapid test", status: "ongoing", code: "S103" },
  { id: 3, name: "HCI UI/UX Challenge 02", status: "upcoming", code: "S104" },
  { id: 4, name: "Graph Assignment 02", status: "upcoming", code: "S105" },
  { id: 5, name: "HCI UI/UX Challenge 01", status: "completed", code: "S106" },
];


const CompletedStatus = () => (
  <div style={{ color: 'green', display: 'flex', alignItems: 'center' }}>
    <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: '8px' }} />
    <Title level={5} style={{ margin: 0 }}>Completed</Title>
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

const StatusComponent = ({ status }: { status: string }) => {
  switch (status) {
    case "completed":
      return <CompletedStatus />;
    case "ongoing":
      return <OngoingStatus />;
    case "upcoming":
      return <UpcomingStatus />;
    default:
      return null;
  }
};

export const CandidateAllExams = () => {
  return (
    <div style={{ padding: '0px' }}>
      <Title level={2}>All Exams</Title>
      <Row gutter={[24, 24]}>
        {exams.map((exam) => (
          <Col xs={24} sm={12} md={8} lg={8} key={exam.id}>
            <div style={{
              borderRadius: '8px',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              height: '200px',
              padding: '16px',
              justifyContent: 'space-between',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>

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
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CandidateAllExams;