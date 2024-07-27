import { Card, Col, Flex, Row, Typography } from "antd";
const { Title } = Typography;

const badges = [
  { id: 1, name: 'Badge 1', image: 'https://cdn-icons-png.flaticon.com/512/11300/11300263.png' },
  { id: 2, name: 'Badge 2', image: 'https://cdn-icons-png.flaticon.com/512/1953/1953275.png' },
  { id: 3, name: 'Badge 3', image: 'https://cdn-icons-png.flaticon.com/512/8146/8146789.png' },
  { id: 4, name: 'Badge 4', image: 'https://cdn-icons-png.flaticon.com/512/11300/11300263.png' },
  
  // Add more badges as needed
];


export const CandidateBadges = () => {
  return (
    <div style={{ padding: '0' }}>
      <Title level={2} style={{ margin: 0 }}>Badges</Title>
      <Row gutter={[24, 24]} style={{marginTop:'10px'}}>
        {badges.map(badge => (
          <Col key={badge.id} xs={24} sm={12} md={8} lg={6} xl={4} style={{  }} >
            <div className="badge-card"
              style={{ borderRadius:'10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor:'white' }}>
              <Row className="image-section"
                style={{
                  padding: '10px',
                  width: '100%',
                  height: '150px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                }}
              >
                <img src={badge.image} alt={badge.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
              </Row>
              <Row className="badge-name" justify={"center"}>
                <Title level={5} style={{ margin: 0, textAlign: 'center' }}>{badge.name}</Title>
              </Row>
            </div>

          </Col>
        ))}
      </Row>
    </div>


  );
};