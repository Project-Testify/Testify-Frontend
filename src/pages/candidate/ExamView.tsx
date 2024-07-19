import {theme } from 'antd';
import { Row, Col} from 'antd';
import { CSSProperties } from 'react';

// import { useEffect, useState } from 'react';
// import { Button, message, Steps, theme } from 'antd';
import {
//   // FileProtectOutlined,
//   // FileSyncOutlined,
  HomeOutlined,
  ContainerOutlined,
//   ControlOutlined,
//   VideoCameraOutlined,
//   AudioOutlined,
//   FullscreenOutlined,
//   // SafetyCertificateOutlined,
//   // UsergroupAddOutlined,
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
// // import { useFetchData } from '../../hooks';
// // import { useStylesContext } from '../../context';



export const ExamViewPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

      const questionStyle: CSSProperties = {
        padding: '1px 24px',
        minHeight: 380,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        textAlign: 'justify',
        fontSize: '22px',
        fontWeight: 'bold',
    };

    
    const timeStyle: CSSProperties = {
        padding: 24,
        minHeight: 380,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
    };
    
    return (

        <div style={{ padding: '20px' }}>
        <Helmet>
          <title>Testify | Machine Learning - Quiz 3</title>
        </Helmet>
        <PageHeader
          title="Machine Learning - Quiz 3"
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
            }
          ]}
        />

        <Row gutter={[16, 16]}>
             {/* ----------------Time Container----------------- */}
             {/* ----------------Yeah I know, the second one comes first. Why? who tf knows :| ----------------- */}
            <Col span={6} push={18}> 
                <Col span={24}>
                    <div style={timeStyle}>
                        Time Remaining
                    </div>
                </Col>
            </Col>
            {/* ----------------Question Container----------------- */}
            <Col span={18} pull={6}>
                <Col span={24}>
                    <div style={questionStyle}>
                        <p> 5. Which of the following algorithms is typically used for classification tasks in machine learning?</p>
                    </div>
                </Col>
            </Col>
        </Row>
        </div>
    );

};