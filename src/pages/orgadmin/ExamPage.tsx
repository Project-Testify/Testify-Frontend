import { ExamsTable, PageHeader } from '../../components';

import {
  BankOutlined,
  HomeOutlined,
  // PieChartOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Space } from 'antd';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Exams } from '../../types';
import { useFetchData } from '../../hooks';
import { Link } from 'react-router-dom';
import { PATH_ORG_ADMIN } from '../../constants/routes';

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

export const ExamPage = () => {
  const {
    data: examsData,
    // error: examsDataError,
    // loading: examsDataLoading,
  } = useFetchData('../mocks/ExamsMock.json');

  const [examTabsKey, setExamTabKey] = useState<string>('all');

  const EXAM_TABS_CONTENT: Record<string, React.ReactNode> = {
    all: <ExamsTable key="all-projects-table" data={examsData} />,
    inProgress: (
      <ExamsTable
        key="in-progress-projects-table"
        data={examsData.filter((_: Exams) => _.exam_status === 'Active')}
      />
    ),
    upcoming: (
      <ExamsTable
        key="on-hold-projects-table"
        data={examsData.filter((_: Exams) => _.exam_status === 'Upcoming')}
      />
    ),
  };

  const onProjectsTabChange = (key: string) => {
    setExamTabKey(key);
  };

  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'All exams'}
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
                <BankOutlined />
                <span>Exams</span>
              </>
            ),
          },
        ]}
      />
      <Col span={24}>
        <Card
          extra={
            <Space>
              <Link to={PATH_ORG_ADMIN.new_exam}>
                <Button icon={<PlusOutlined />}>New Exam</Button>
              </Link>
            </Space>
          }
          tabList={EXAM_TABS}
          activeTabKey={examTabsKey}
          onTabChange={onProjectsTabChange}
          // style={{ backgroundColor: '#fff' }}
        >
          {EXAM_TABS_CONTENT[examTabsKey]}
        </Card>
      </Col>

      {/* <Row> */}
      {/* </Row> */}
    </div>
  );
};
