// import { useEffect, useState } from 'react';
import { Row, Col, Button} from 'antd';
import ExamDetailCard from '../../components/Card/ExamDetailCard';
import ExamDescription from '../../components/Exam/ExamDescription';
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

const topics = ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Algorithm Selection', 'Practical Applications', 'Feature Engineering'];

const instructions = [
    'Read each question carefully before answering.',
    'No additional time will be given.',
    'Ensure you have a stable internet connection.',
    'Do not refresh the browser during the quiz.',
    'The quiz is proctored, so ensure your camera and microphone are working.'
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
                    <Row gutter={[16, 16]} justify="center">
                        <Col span={11}>
                            <ExamDetailCard
                                icon={<FileTextOutlined />}
                                title="Type"
                                content="Multiple Choice"
                            />
                        </Col>
                        <Col span={11}>
                            <ExamDetailCard
                                icon={<ClockCircleOutlined />}
                                title="Time"
                                content="60 minutes"
                            />
                        </Col>
                        <Col span={11}>
                            <ExamDetailCard
                                icon={<BarChartOutlined />}
                                title="Level"
                                content="Intermediate"
                            />
                        </Col>
                        <Col span={11}>
                            <ExamDetailCard
                                icon={<SafetyCertificateOutlined />}
                                title="Proctoring"
                                content="Yes"
                            />
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
                    <Col span={24}>
                    <ExamDescription
                        examName="Machine Learning - Quiz 3"
                        description="This quiz assesses your understanding of the fundamental concepts in machine learning, including algorithms, model evaluation, and practical applications. The quiz is designed to test both theoretical knowledge and practical skills."
                        topics={topics}
                        instructions={instructions}
                    />
                    </Col>
                </Col>
            </Row>
        </div>
  
  );

};
