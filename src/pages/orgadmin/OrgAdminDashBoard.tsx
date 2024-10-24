/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Col, message, Row } from 'antd';
import {  
  PageHeader,
  MarketingStatsCard,
  LogisticsStatsCard,
  LearningStatsCard,
  ExamListCard,
} from '../../components';


import {
  HomeOutlined,
  PieChartOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { getLoggedInUser } from '../../utils/authUtils';
import { useEffect, useState } from 'react';
import { ExamResponse } from '../../api/types';
import { getExams } from '../../api/services/organization';

export const OrgAdminDashBoard = () => {
  const [exams, setExams] = useState<ExamResponse[]>([]);
  const [upcomingExams, setUpcomingExams] = useState<ExamResponse[]>([]);
  
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) {
    message.error("You must be logged in to perform this action.");
    return;
  }
  const organizationId = loggedInUser.id;


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

  useEffect(()=>{
    const currentDate = new Date();
    setUpcomingExams(exams.filter((exam)=>new Date(exam.startDatetime)>currentDate));
  },[exams])

  // const {
  //   data: examCardData,
  //   error: examCardDataError,
  //   loading: examCardDataLoading,
  // } = useFetchData('../mocks/Exams.json');


  return (
    <div>
      <Helmet>
        <title>Testify</title>
      </Helmet>
      <PageHeader
        title={'Welcome ' + loggedInUser?.firstName}
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
            value={exams.length}
            icon={FileTextOutlined}
            color="#6f7ae8"
            progress={30}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <MarketingStatsCard
            data={[274, 337, 81, 497]}
            title="Active Candidates"
            diff={12.5}
            value={420}
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
          <ExamListCard exams={upcomingExams} />
        </Col>
      </Row>
    </div>
  );
};
