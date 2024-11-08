import { ExamsTable, PageHeader } from '../../components';

import {
  BankOutlined,
  HomeOutlined,
  // PieChartOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, message, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PATH_ORG_ADMIN } from '../../constants/routes';
import { ExamResponse } from '../../api/types';
import { getLoggedInUser } from '../../utils/authUtils';
import { getExams } from '../../api/services/organization';

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
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error("You must be logged in to perform this action.");
    return;
  }
  const organizationId = loggedInUser.id;
  const currentDate = new Date();

  const fetchExams = async() => {
    try{
      const response  = await getExams(organizationId);
      const exams = response.data;
      console.log(response.data);
      setExams(exams);
      console.log("exams",exams);
    }catch(error){
      message.error("Error fetching exams");
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchExams();
  },[organizationId])

  const [examTabsKey, setExamTabKey] = useState<string>('all');
  const [examsData, setExams] = useState<ExamResponse[]>([]);

  const calculateExamStatus = (exam: ExamResponse, currentDate: Date) => {
    const start = new Date(exam.startDatetime);
    const end = new Date(exam.endDatetime);
  
    if (currentDate < start) {
      return 'Upcoming';
    } else if (currentDate >= start && currentDate <= end) {
      return 'Active';
    } else {
      return 'Completed';
    }
  };

  const EXAM_TABS_CONTENT: Record<string, React.ReactNode> = {
    all: (
      <ExamsTable
        key="all-projects-table"
        data={examsData.map((exam) => ({
          ...exam,
          exam_status: calculateExamStatus(exam, currentDate),
        }))}
      />
    ),
    inProgress: (
      <ExamsTable
        key="in-progress-projects-table"
        data={examsData
          .filter((exam) => new Date(exam.startDatetime) <= currentDate && currentDate <= new Date(exam.endDatetime))
          .map((exam) => ({
            ...exam,
            exam_status: 'Active',
          }))}
      />
    ),
    upcoming: (
      <ExamsTable
        key="upcoming-projects-table"
        data={examsData
          .filter((exam) => new Date(exam.startDatetime) > currentDate)
          .map((exam) => ({
            ...exam,
            exam_status: 'Upcoming',
          }))}
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
