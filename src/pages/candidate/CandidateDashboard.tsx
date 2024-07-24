import { Typography } from 'antd';

const { Title} = Typography;

export const CandidateDashboard = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Typography>
        <Title level={2}>Candidate Dashboard</Title>
      </Typography>
    </div>
  );
};

export default CandidateDashboard;
