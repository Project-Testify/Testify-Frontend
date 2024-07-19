// import { useEffect, useState } from 'react';
import { Row, Col, Card, Tag, Button} from 'antd';
import {
//   // FileProtectOutlined,
//   // FileSyncOutlined,
  HomeOutlined,
  ContainerOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import {
//   //   CommunityGroupCard,
//   //   CoursesCard,
//   //   CoursesCarousel,
//   //   ExamsCard,
//   //   LearningStatsCard,
  PageHeader,
//   //   ProgressCard,
//   //   StudyStatisticsCard,
} from '../../components';
// // import { DASHBOARD_ITEMS } from '../../constants';
// // import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import { useFetchData } from '../../hooks';
// import { useStylesContext } from '../../context';

const topics = [
  'Supervised Learning',
  'Unsupervised Learning',
  'Model Evaluation Metrics',
  'Feature Engineering',
  'Overfitting and Underfitting',
  'Algorithm Selection'
];


export const ExamSummaryPage = () => {

  return(
    <div style={{ padding: '20px' }}>
      <Helmet>
        <title>Testify | Machine Learning - Quiz 3</title>
      </Helmet>
      <PageHeader
        title="Exam Summary"
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
                <span>Machine Learning - Quiz 3</span>
              </>
            ),
            path: '/',
            // menu: {
            //   items: DASHBOARD_ITEMS.map((d) => ({
            //     key: d.title,
            //     title: <Link to={d.path}>{d.title}</Link>,
            //   })),
            // },
          }
        ]}
      />
            <Row gutter={[16, 16]}>
                <Col span={8} push={16}>
                    <Row gutter={[16, 16]}>
                        <Col span={11}>
                            <Card title={<span><FileTextOutlined /> Type</span>} bordered={false}>
                                Multiple Choice
                            </Card>
                        </Col>
                        <Col span={11}>
                            <Card title={<span><ClockCircleOutlined /> Time</span>} bordered={false}>
                                60 minutes
                            </Card>
                        </Col>
                        <Col span={11}>
                            <Card title={<span><BarChartOutlined /> Level</span>} bordered={false}>
                                Intermediate
                            </Card>
                        </Col>
                        <Col span={11}>
                            <Card title={<span><SafetyCertificateOutlined /> Proctoring</span>} bordered={false}>
                                Yes
                            </Card>
                        </Col>
                        <Col span={24}>
                          <div style={{ marginTop: '16px', textAlign: 'center' }}>
                              <Button type="primary" size="large" style={{ width: '150px' }}>
                                  Start Test
                              </Button>
                          </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={16} pull={8}>
                  <div>
                      <h2>Machine Learning - Quiz 3</h2>
                      <p>This quiz assesses your understanding of the fundamental concepts in machine learning, including algorithms, model evaluation, and practical applications. The quiz is designed to test both theoretical knowledge and practical skills.</p>
                      <h3>Covered Topics:</h3>
                      <div>
                          {topics.map((topic, index) => (
                              <Tag key={index} color="blue" style={{ marginBottom: '8px' }}>
                                  {topic}
                              </Tag>
                          ))}
                      </div>
                      <h3>Instructions:</h3>
                      <ul>
                          <li>Read each question carefully before answering.</li>
                          <li>No additional time will be given.</li>
                          <li>Ensure you have a stable internet connection.</li>
                          <li>Do not refresh the browser during the quiz.</li>
                          <li>The quiz is proctored, so ensure your camera and microphone are working.</li>
                      </ul>
                  </div>
              </Col>
            </Row>
        </div>
  
  );

};
