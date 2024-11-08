/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Col, Row } from 'antd';
import {  
  PageHeader,
  MarketingStatsCard,
  LogisticsStatsCard,
  LearningStatsCard,
  // ExamListCard,
} from '../../components';


import {
  HomeOutlined,
  PieChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
// import { useFetchData } from '../../hooks';
import { getLoggedInUser } from '../../utils/authUtils';



export const AdminDashBoard = () => {

  // const {
  //   data: tasksListData = [],
  //   error: tasksListError,
  //   loading: tasksListLoading,
  // } = useFetchData('../mocks/ExamsMock.json');

  const chartData = [
    { type: 'Active', value: 274 },
    { type: 'Upcoming', value: 337 },
    { type: 'Completed', value: 81 },
    { type: 'Other', value: 497 }
  ];
  

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
            title="Total Exams"
            value1= {6}
            value2={7}
            icon={FileTextOutlined}
            color="#6f7ae8"
            progress={30}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <MarketingStatsCard
            data={chartData}
            title="Exam Status"
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
          {/* <ExamListCard
            exams={tasksListData}
          /> */}
        </Col>
      </Row>
    </div>
  );
};
