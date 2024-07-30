/* eslint-disable @typescript-eslint/ban-ts-comment */
import {  Col, Row } from 'antd';
import {
  PageHeader,
  MarketingStatsCard,
  LogisticsStatsCard,
  LearningStatsCard,
  ExamListCard,
} from '../../components';

// import { ExamsCard } from '../../components/dashboard/shared/ExamsCard/ExamsCard';

import {
  HomeOutlined,
  PieChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import { getLoggedInUser } from '../../utils/authUtils';
// import { or } from 'firebase/firestore';

// const RevenueColumnChart = () => {
//   const data = [
//     {
//       name: 'Present',
//       period: 'Mon',
//       value: 18.9,
//     },
//     {
//       name: 'Present',
//       period: 'Tue',
//       value: 28.8,
//     },
//     {
//       name: 'Present',
//       period: 'Wed',
//       value: 39.3,
//     },
//     {
//       name: 'Present',
//       period: 'Thur',
//       value: 81.4,
//     },
//     {
//       name: 'Present',
//       period: 'Fri',
//       value: 47,
//     },
//     {
//       name: 'Present',
//       period: 'Sat',
//       value: 20.3,
//     },
//     {
//       name: 'Present',
//       period: 'Sun',
//       value: 24,
//     },
//     {
//       name: 'Absent',
//       period: 'Mon',
//       value: 12.4,
//     },
//     {
//       name: 'Absent',
//       period: 'Tue',
//       value: 23.2,
//     },
//     {
//       name: 'Absent',
//       period: 'Wed',
//       value: 34.5,
//     },
//     {
//       name: 'Absent',
//       period: 'Thur',
//       value: 99.7,
//     },
//     {
//       name: 'Absent',
//       period: 'Fri',
//       value: 52.6,
//     },
//     {
//       name: 'Absent',
//       period: 'Sat',
//       value: 35.5,
//     },
//     {
//       name: 'Absent',
//       period: 'Sun',
//       value: 37.4,
//     },
//   ];
//   const config = {
//     data,
//     isGroup: true,
//     xField: 'period',
//     yField: 'value',
//     seriesField: 'name',

//     /** set color */
//     // color: ['#1ca9e6', '#f88c24'],

//     /** Set spacing */
//     // marginRatio: 0.1,
//     label: {
//       // Label data label position can be manually configured
//       position: 'middle',
//       // 'top', 'middle', 'bottom'
//       // Configurable additional layout method
//       layout: [
//         // Column chart data label position automatically adjusted
//         {
//           type: 'interval-adjust-position',
//         }, // Data label anti-obstruction
//         {
//           type: 'interval-hide-overlap',
//         }, // Data label text color automatically adjusted
//         {
//           type: 'adjust-color',
//         },
//       ],
//     },
//   };
// // @ts-ignore
//   return <Column {...config} />;
// };



export const OrgAdminDashBoard = () => {
  

  const {
    data: tasksListData = [],
    error: tasksListError,
    loading: tasksListLoading,
  } = useFetchData('../mocks/ExamsMock.json');

  // const {
  //   data: examCardData,
  //   error: examCardDataError,
  //   loading: examCardDataLoading,
  // } = useFetchData('../mocks/Exams.json');

  

  //get user from getLoggedInUser
  const user = getLoggedInUser();

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'Welcome ' + user?.firstName}
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
                <PieChartOutlined />
                <span>dashboard</span>
              </>
            ),
          },
        ]}
      />
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={12} lg={8}>
          <LearningStatsCard
            title="Today Exams in Progress"
            value={18}
            icon={FileTextOutlined}
            color="#6f7ae8"
            progress={30}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <MarketingStatsCard
            data={[274, 337, 81, 497]}
            title="Upcoming Exams"
            diff={12.5}
            value={16826}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <LogisticsStatsCard
            icon={FileTextOutlined}
            value={234}
            title="Exams Completed"
            diff={12.5}
          />
        </Col>

        <Col span={24}>
          <ExamListCard
            data={tasksListData}
            error={tasksListError}
            loading={tasksListLoading}
          />
        </Col>
        {/* <Col xs={24} sm={12} xl={16}>
          <Card
            title="Exam stats"
            extra={
              <Segmented
                options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
              />
            }
          >
            <RevenueColumnChart />
          </Card>
        </Col> */}
        {/* <Col xs={24} sm={12} xl={8}>
          <Card title="Top clients">
            <ExamCards
              data={examCardData}
              loading={examCardDataLoading}
              error={examCardDataError}
            />
          </Card>
        </Col> */}
        
      </Row>
    </div>
  );
};
