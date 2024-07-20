import { Helmet } from "react-helmet-async";
import { LearningStatsCard, PageHeader } from "../../components";
import { BookOutlined, HomeOutlined, PieChartOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";

export const CandidateDashboard = () => {

  const candidateName = 'Kaumadi';
  
  return (
    <div>
      <Helmet>
        <title>Candidate Dashboard</title>
      </Helmet>

      <PageHeader 
        title={`Welcome ${candidateName}`}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined/>
                <span>Home</span>
              </>
            ),
            path:'/'
          },
          {
            title: (
              <>
                <PieChartOutlined/>
                <span>Dashboard</span>
              </>
            ),
          }
        ]}
        />

      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}>

        <Col xs={24} sm={12} lg={8}>
          <LearningStatsCard
            title="Exams in Progress"
            value={10}
            icon={BookOutlined}
            color="#1890ff"
            progress={10}
          />
        </Col>
      </Row>
    </div>
  );

};
