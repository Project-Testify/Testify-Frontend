import React, { useState } from 'react';
import { Col, Row, Typography, Modal } from 'antd';
import Confetti from 'react-confetti';
const { Title } = Typography;

const badges = [
  { id: 1, name: 'Rising Scholar', image: 'https://cdn-icons-png.flaticon.com/512/11300/11300263.png', description: 'Awarded to those who have successfully completed all beginner level courses with distinction.' },
  { id: 2, name: 'Challenge Conqueror', image: 'https://cdn-icons-png.flaticon.com/512/1953/1953275.png', description: 'Granted to learners who have mastered all intermediate challenges and demonstrated strong problem-solving skills.' },
  { id: 3, name: 'Elite Academic', image: 'https://cdn-icons-png.flaticon.com/512/8146/8146789.png', description: 'Earned by achieving outstanding results in the most advanced coursework and tests.' },
  { id: 4, name: 'Valedictorian Victor', image: 'https://cdn-icons-png.flaticon.com/512/11300/11300263.png', description: 'An exclusive accolade for those who top the leaderboard in the final examinations, setting them apart as exceptional scholars.' },
  // Add more badges as needed
];

export const CandidateBadges = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<{ id: number; name: string; image: string; description: string } | null>(null);
  const [confettiRunning, setConfettiRunning] = useState(false);

  const showModal = (badge: { id: number; name: string; image: string; description: string }) => {
    setSelectedBadge(badge);
    setIsModalVisible(true);
    setConfettiRunning(true);  // Start confetti when the modal is opened
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setConfettiRunning(false);  // Stop confetti when the modal is closed
  };

  return (
    <div style={{ padding: '0' }}>
      {confettiRunning && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <Title level={2} style={{ margin: 0 }}>Badges</Title>
      <Row gutter={[24, 24]} style={{ marginTop: '10px' }}>
        {badges.map(badge => (
          <Col key={badge.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <div className="badge-card" onClick={() => showModal(badge)}
              style={{
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}>
              <Row className="image-section" style={{
                  padding: '10px',
                  width: '100%',
                  height: '150px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <img src={badge.image} alt={badge.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
              </Row>
              <Row className="badge-name" justify={"center"}>
                <Title level={5} style={{ margin: 0, textAlign: 'center' }}>{badge.name}</Title>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
      <Modal
        title={<Title level={3} style={{ margin: 0, color: '#1890ff' }}>{selectedBadge ? selectedBadge.name : 'Badge Details'}</Title>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ top: 20 }}
        bodyStyle={{
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        {selectedBadge && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img 
              src={selectedBadge.image} 
              alt={selectedBadge.name} 
              style={{ 
                width: '80%',
                maxHeight: '200px',
                objectFit: 'contain',
                borderRadius: '4px',
                marginBottom: '20px',
              }} 
            />
            <Title level={4} style={{ textAlign: 'center', color: '#595959', marginBottom: '12px' }}>{selectedBadge.name}</Title>
            <p style={{
              fontSize: '16px',
              color: '#595959',
              textAlign: 'center',
              lineHeight: '24px',
              maxWidth: '100%',
            }}>{selectedBadge.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CandidateBadges;
