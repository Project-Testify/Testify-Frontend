/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Alert, Button, Col, message, Row, Segmented, Space } from 'antd';
import {
  Card,
  Loader,
  PageHeader,
  // LearningStatsCard,
  ExamsCard as ExamCards,
} from '../../components';

import { ExamsCard } from '../../components/dashboard/shared/ExamsCard/ExamsCard';
import { Column } from '@ant-design/charts';
import { Exams } from '../../types';
import { useState } from 'react';
import {
  HomeOutlined,
  PieChartOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import { getLoggedInUser } from '../../utils/authUtils';
// import { or } from 'firebase/firestore';

const RevenueColumnChart = () => {
  const data = [
    {
      name: 'Present',
      period: 'Mon',
      value: 18.9,
    },
    {
      name: 'Present',
      period: 'Tue',
      value: 28.8,
    },
    {
      name: 'Present',
      period: 'Wed',
      value: 39.3,
    },
    {
      name: 'Present',
      period: 'Thur',
      value: 81.4,
    },
    {
      name: 'Present',
      period: 'Fri',
      value: 47,
    },
    {
      name: 'Present',
      period: 'Sat',
      value: 20.3,
    },
    {
      name: 'Present',
      period: 'Sun',
      value: 24,
    },
    {
      name: 'Absent',
      period: 'Mon',
      value: 12.4,
    },
    {
      name: 'Absent',
      period: 'Tue',
      value: 23.2,
    },
    {
      name: 'Absent',
      period: 'Wed',
      value: 34.5,
    },
    {
      name: 'Absent',
      period: 'Thur',
      value: 99.7,
    },
    {
      name: 'Absent',
      period: 'Fri',
      value: 52.6,
    },
    {
      name: 'Absent',
      period: 'Sat',
      value: 35.5,
    },
    {
      name: 'Absent',
      period: 'Sun',
      value: 37.4,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'period',
    yField: 'value',
    seriesField: 'name',

    /** set color */
    // color: ['#1ca9e6', '#f88c24'],

    /** Set spacing */
    // marginRatio: 0.1,
    label: {
      // Label data label position can be manually configured
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // Configurable additional layout method
      layout: [
        // Column chart data label position automatically adjusted
        {
          type: 'interval-adjust-position',
        }, // Data label anti-obstruction
        {
          type: 'interval-hide-overlap',
        }, // Data label text color automatically adjusted
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  // @ts-ignore
  return <Column {...config} />;
};

const EXAM_TABS = [
  {
    key: 'all',
    label: 'All exams',
  },
  {
    key: 'inProgress',
    label: 'Active',
  },
  {
    key: 'upcoming',
    label: 'Upcoming',
  },
];

export const ExamSetterDashBoardPage = () => {
  const {
    data: examsData,
    error: examsDataError,
    loading: examsDataLoading,
  } = useFetchData('../mocks/ExamsMock.json');

  const {
    data: examCardData,
    error: examCardDataError,
    loading: examCardDataLoading,
  } = useFetchData('../mocks/Exams.json');

  const [examTabsKey, setExamTabKey] = useState<string>('all');
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error("You must be logged in to perform this action.");
    return;
  }

  // const EXAM_TABS_CONTENT: Record<string, React.ReactNode> = {
  //   all: <ExamsTable key="all-projects-table" data={examsData} />,
  //   inProgress: (
  //     <ExamsTable
  //       key="in-progress-projects-table"
  //       data={examsData.filter((_: Exams) => _.exam_status === 'Active')}
  //     />
  //   ),
  //   upcoming: (
  //     <ExamsTable
  //       key="on-hold-projects-table"
  //       data={examsData.filter((_: Exams) => _.exam_status === 'Upcoming')}
  //     />
  //   ),
  // };

  const onProjectsTabChange = (key: string) => {
    setExamTabKey(key);
  };

  // const [ExamSetterName, SetExamSetterName] = useState('ExamSetter Name');
  
  const ExamSetterName = loggedInUser.firstName;
  const selectedOrgId = sessionStorage.getItem('orgId');

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'Welcome ' + ExamSetterName}
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
        <Col span={24}>
          <Card
            title="Recently added Exams"
            extra={<Button>View all Exam</Button>}
          >
            {examsDataError ? (
              <Alert
                message="Error"
                description={examsDataError.toString()}
                type="error"
                showIcon
              />
            ) : examsDataLoading ? (
              <Loader />
            ) : (
              <Row gutter={[16, 16]}>
                {examsData.slice(0, 4).map((o: Exams) => {
                  return (
                    <Col xs={24} sm={12} xl={6} key={o.exam_id}>
                      <ExamsCard
                        exams={o}
                        type="inner"
                        style={{ height: '100%' }}
                      />
                    </Col>
                  );
                })}
              </Row>
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} xl={16}>
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
        </Col>
        <Col xs={24} sm={12} xl={8}>
          <Card>
            <ExamCards
              data={examCardData}
              loading={examCardDataLoading}
              error={examCardDataError}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title="Exams"
            extra={
              <Space>
                <Button icon={<PlusOutlined />}>New Exam</Button>
              </Space>
            }
            tabList={EXAM_TABS}
            activeTabKey={examTabsKey}
            onTabChange={onProjectsTabChange}
          >
            {/* {EXAM_TABS_CONTENT[examTabsKey]} */}
            <h1>hi</h1>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
